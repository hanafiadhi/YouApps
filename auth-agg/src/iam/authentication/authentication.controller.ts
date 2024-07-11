import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Response, response } from 'express';
import { AccessTokenGuard } from './guard/access-token.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { TokenExpiredError } from '@nestjs/jwt';
import { OtpAuthenticationService } from './otp-authentication.service';
import { toFileStream } from 'qrcode';
import {
  ErrorBadRequestExecption,
  SignBody,
  registerResponeSuccess,
} from '@app/common';
import { loginResponeSuccess } from '@app/common';
import { ErrorUnauthorizedException } from '@app/common';
import { ActiveUser } from '../../common/decorators/active-user.decorator';
import { ActiveUserData } from '../../common/interface/active-user-data.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly otpAuthenticationService: OtpAuthenticationService,
  ) {}

  @MessagePattern('verify-token')
  async validateUser(jwtToken: string) {
    try {
      return await this.authService.verifyToken(jwtToken);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new RpcException(
          new UnauthorizedException('Please Login Again').getResponse(),
        );
      }
      throw new RpcException(
        new UnauthorizedException('Please Login Again').getResponse(),
      );
    }
  }

  @MessagePattern('health-check')
  async nice(@Payload() data: any) {
    return data;
  }

  @Version('1')
  @Post('/register')
  @ApiCreatedResponse({ type: registerResponeSuccess })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  async signUp(
    @Res({ passthrough: true }) response: Response,
    @Body() signUpDto: SignUpDto,
  ) {
    await this.authService.signUp(signUpDto);
    response.status(HttpStatus.CREATED).json({
      message: 'Congratulations You Have Successfully Created an Account',
      StatusCode: HttpStatus.CREATED,
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiBody({ required: true, type: SignBody })
  @ApiOkResponse({ type: loginResponeSuccess })
  @ApiUnauthorizedResponse({ type: ErrorUnauthorizedException })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @Post('login')
  @Version('1')
  async signInv2(@Body() signIn: SignInDto) {
    return await this.authService.signIn(signIn);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  @Version('1')
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @ApiBearerAuth('jwt')
  @Version('1')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @ActiveUser() user: ActiveUserData,
  ) {
    await this.authService.logout(user.sub);
    response.status(HttpStatus.OK).json({
      message: 'Congratulations You have successfully logged out',
      StatusCode: HttpStatus.OK,
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('jwt')
  @UseGuards(AccessTokenGuard)
  @Post('change-password')
  @Version('1')
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  async changePassword(
    @Res({ passthrough: true }) response: Response,
    @ActiveUser() user: ActiveUserData,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.authService.changePassword(changePasswordDto, user.sub);
    response.status(HttpStatus.OK).json({
      message: 'Password successfully changed',
      StatusCode: HttpStatus.OK,
    });
  }

  @ApiExcludeEndpoint()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('auth/2fa/generate')
  async generateQrCode(
    @ActiveUser() ActiveUser: ActiveUserData,
    @Res() response: Response,
  ) {
    const { secret, uri, token } =
      await this.otpAuthenticationService.generateSecret(ActiveUser.username);
    await this.otpAuthenticationService.enableTfaForUser(
      ActiveUser.username,
      token,
      secret,
    );
    // response.status(200).json(secret);
    response.type('png');
    return toFileStream(response, uri);
  }
}
