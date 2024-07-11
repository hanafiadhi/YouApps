import { Test, TestingModule } from '@nestjs/testing';

import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { AuthenticationController } from '../src/iam/authentication/authentication.controller';
import { AuthenticationService } from '../src/iam/authentication/authentication.service';
import { OtpAuthenticationService } from '../src/iam/authentication/otp-authentication.service';
import { SignUpDto } from '../src/iam/authentication/dto/sign-up.dto';
import { SignInDto } from '../src/iam/authentication/dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserClientService } from '../src/consumer/use-case/user.use-case';
import { RedisClientService } from '../src/consumer/use-case/redis.use-cae';
import jwtConfig from '../src/common/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { HashingService } from '../src/iam/hashing.service';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let service: AuthenticationService;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            refreshToken: jest.fn(),
            logout: jest.fn(),
            changePassword: jest.fn(),
            verifyToken: jest.fn(),
          },
        },
        {
          provide: OtpAuthenticationService,
          useValue: {
            generateSecret: jest.fn(),
            enableTfaForUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should register a user', async () => {
      const signUpDto: SignUpDto = {
        username: 'test',
        password: 'test',
        email: 'test@test.com',
        applications: [],
        role: [],
        confirm_password: 'test',
      };
      const result = {
        message: 'Congratulations You Have Successfully Created an Account',
        StatusCode: HttpStatus.CREATED,
      };

      jest.spyOn(service, 'signUp').mockResolvedValue(result);

      await controller.signUp(mockResponse, signUpDto);

      expect(service.signUp).toHaveBeenCalledWith(signUpDto);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith(result);
    });
  });

  describe('signInv2', () => {
    it('should login a user', async () => {
      const signInDto: SignInDto = {
        username: 'test',
        password: 'test',
        applications: '',
      };
      const result = {
        sub: '1',
        username: 'test',
        tenant_id: 'tenant',
        role: 'user',
        accessToken: 'token',
        refreshToken: 'token',
      };

      jest.spyOn(service, 'signIn').mockResolvedValue(result);

      const response = await controller.signInv2(signInDto);

      expect(service.signIn).toHaveBeenCalledWith(signInDto);
      expect(response).toEqual(result);
    });
  });
});

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let jwtService: JwtService;
  let userClientService: UserClientService;
  let redisClientService: RedisClientService;
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: UserClientService,
          useValue: {
            createUser: jest.fn(),
            findByUsername: jest.fn(),
            findById: jest.fn(),
            changePassword: jest.fn(),
          },
        },
        {
          provide: RedisClientService,
          useValue: {
            saveOrUpdateCache: jest.fn(),
            getCache: jest.fn(),
            deleteCache: jest.fn(),
          },
        },
        {
          provide: OtpAuthenticationService,
          useValue: {
            generateSecret: jest.fn(),
            enableTfaForUser: jest.fn(),
          },
        },
        {
          provide: jwtConfig.KEY,
          useValue: {
            secret: 'test-secret',
            audience: 'test-audience',
            issuer: 'test-issuer',
            accessTokenTtl: 3600,
            refreshTokenTtl: 86400,
          } as ConfigType<typeof jwtConfig>,
        },
        {
          provide: HashingService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    jwtService = module.get<JwtService>(JwtService);
    userClientService = module.get<UserClientService>(UserClientService);
    redisClientService = module.get<RedisClientService>(RedisClientService);
    hashingService = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should register a user', async () => {
      const signUpDto: SignUpDto = {
        username: 'test',
        password: 'test',
        email: 'test@test.com',
        applications: ['mobile-youapp'],
        role: ['user-youapp'],
        confirm_password: 'test',
      };
      const result = { message: 'User created' };

      jest.spyOn(userClientService, 'createUser').mockResolvedValue(result);

      const response = await service.signUp(signUpDto);

      expect(userClientService.createUser).toHaveBeenCalledWith(signUpDto);
      expect(response).toEqual(result);
    });
  });

  describe('signIn', () => {
    it('should login a user', async () => {
      const signInDto: SignInDto = {
        username: 'test',
        password: 'test',
        applications: 'mobile-youapp',
      };
      const user = {
        _id: '1',
        username: 'test',
        password: 'hashedpassword', // Ensure this matches the hashing service
        applications: ['mobile-youapp'],
        role: ['user-youapp'],
      };
      const token = {
        sub: '1',
        username: 'test',
        tenant_id: 'tenant',
        role: 'user',
        accessToken: 'token',
        refreshToken: 'token',
      };

      jest.spyOn(userClientService, 'findByUsername').mockResolvedValue(user);
      jest.spyOn(hashingService, 'compare').mockResolvedValue(true); // Mock the password comparison
      jest.spyOn(service, 'generateToken').mockResolvedValue(token);

      const response = await service.signIn(signInDto);

      expect(userClientService.findByUsername).toHaveBeenCalledWith(
        signInDto.username,
      );
      expect(hashingService.compare).toHaveBeenCalledWith(
        'hashedpassword',
        'test',
      );
      expect(service.generateToken).toHaveBeenCalledWith(user);
      expect(response).toEqual(token);
    });
  });
});
