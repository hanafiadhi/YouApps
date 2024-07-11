import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { HashingService } from '../hashing.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import jwtConfig from '../../common/config/jwt.config';
import { ConfigType } from '@nestjs/config';

import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

import { OtpAuthenticationService } from './otp-authentication.service';

import { RedisClientService } from '../../consumer/use-case/redis.use-cae';
import { ActiveUserData } from '../../common/interface/active-user-data.interface';
import { UserClientService } from '../../consumer/use-case/user.use-case';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly userClientService: UserClientService,

    private readonly redisClientService: RedisClientService,
    private readonly otpAuthenticationService: OtpAuthenticationService,
  ) {}

  async verifyToken(token: string) {
    try {
      const data: ActiveUserData = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      const checkTokenRedis = await this.redisClientService.getCache({
        key: data.sub,
      });

      if (!checkTokenRedis) {
        throw new Error(
          `user : ${data.username} , Token is Not Found in Redis`,
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  private async signToken<T>(
    userId: number | string,
    expiresIn: number,
    payload?: T,
  ) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
  async generateToken(user: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user._id,
        this.jwtConfiguration.accessTokenTtl,
        { username: user.username, role: user.role },
      ),
      this.signToken(user._id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    await this.redisClientService.saveOrUpdateCache({
      key: user._id,
      value: accessToken,
    });

    return {
      sub: user._id,
      username: user.username,
      tenant_id: user.tenant_id,
      role: user.role,
      accessToken,
      refreshToken,
    };
  }
  async signUp(signUpDto: SignUpDto): Promise<any> {
    try {
      delete signUpDto.confirm_password;
      //   signUpDto.password = await this.hashingService.hash(signUpDto.password);
      signUpDto.applications = ['mobile-youapp'];
      signUpDto.role = ['user-youapp'];
      return await this.userClientService.createUser(signUpDto);
    } catch (error) {
      if (error.statusCode == 400) {
        throw new BadRequestException('username or email already exist');
      }
      throw error;
    }
  }
  async signIn(signInDto: SignInDto) {
    const user = await this.userClientService.findByUsername(
      signInDto.username,
    );

    if (!user)
      throw new UnauthorizedException('wrong username or email or password');
    if (
      user.hasOwnProperty('applications') &&
      !user?.applications?.includes(signInDto.applications)
    ) {
      throw new UnauthorizedException('wrong applications');
    }
    const equal = await this.hashingService.compare(
      user.password,
      signInDto.password,
    );

    if (!equal) {
      throw new UnauthorizedException('wrong username or email or password');
    }

    return await this.generateToken(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, username, role } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub' | 'username' | 'role'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
      });

      return await this.generateToken({ _id: sub, username, role });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token Refresh Not Applicable');
      }
      throw new UnauthorizedException();
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto, _id: string) {
    const user = await this.userClientService.findById(_id);
    if (!user) {
      throw new NotFoundException(user);
    }
    const equal = await this.hashingService.compare(
      user.password,
      changePasswordDto.oldPassword,
    );
    console.log(equal);

    if (!equal) {
      throw new BadRequestException('Password not match');
    }
    // changePasswordDto.newPassword = await this.hashingService.hash(
    //   changePasswordDto.newPassword,
    // );

    return await this.userClientService.changePassword({
      userId: user._id,
      data: {
        password: changePasswordDto.newPassword,
      },
    });
  }

  async logout(sub: string) {
    await this.redisClientService.deleteCache({
      key: sub,
    });
  }
}
