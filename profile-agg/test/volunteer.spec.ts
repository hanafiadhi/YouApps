import { Test, TestingModule } from '@nestjs/testing';
import config from '../src/common/configs/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { ProfileController } from '../src/profile/volunteer.controller';
import { VolunteerService } from '../src/profile/volunteer.service';
import { UserClientService } from '../src/consumer/use-case/user.use-case';
import { UserService } from '../src/consumer/service/user.service';
import { ProfileClientService } from '../src/consumer/use-case/profile.use-case';
import { ProfileConsumer } from '../src/consumer/service/profile.service';
import { RmqModule } from '../src/providers/queue/rabbitmq/rmq.module';
import { AUTH_SERVICE, PROFILE_SERVICE, USER_SERVICE } from '../src/common';
import { NotFoundException } from '@nestjs/common';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: VolunteerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: config,
          ignoreEnvFile: false,
          isGlobal: true,
          cache: true,
          envFilePath: ['.env'],
        }),
        RmqModule.register({ name: AUTH_SERVICE }),
        RmqModule.register({ name: USER_SERVICE }),
        RmqModule.register({ name: PROFILE_SERVICE }),
      ],
      controllers: [ProfileController],
      providers: [
        VolunteerService,
        ConfigService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            info: jest.fn(),
          },
        },
        { provide: UserClientService, useClass: UserService },
        { provide: ProfileClientService, useClass: ProfileConsumer },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<VolunteerService>(VolunteerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Tests for getProfile
  describe('getProfile', () => {
    it('should return the user profile', async () => {
      const userId = 'testUserId';
      const userProfile = { name: 'Test User', email: 'test@example.com' };

      jest.spyOn(service, 'findAll').mockResolvedValue({
        data: [userProfile],
      });

      const result = await controller.findMe({ sub: userId });

      expect(service.findAll).toHaveBeenCalledWith({
        page: '1',
        limit: '1',
        user_id: { eq: userId },
      });
      expect(result).toEqual(userProfile);
    });

    it('should throw BadRequestException if profile not found', async () => {
      const userId = 'testUserId';

      jest.spyOn(service, 'findAll').mockResolvedValue({
        data: [],
      });

      try {
        await controller.findMe({ sub: userId });
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toBe('Data tidak ditemukan');
      }
    });
  });

  // Tests for updateProfile
  describe('updateProfile', () => {
    it('should update the user profile', async () => {
      const userId = 'testUserId';
      const updateDto = {
        name: 'Updated Name',
        gender: 'P',
        birt_date: new Date('2000-03-29'),
        height: '1',
        weight: '2',
        is_active: true,
        interest: ['coding'],
      };
      const updatedProfile = { ...updateDto, user_id: userId };

      jest.spyOn(service, 'findAll').mockResolvedValue({
        data: [updatedProfile],
      });

      jest.spyOn(service, 'update').mockResolvedValue(updatedProfile);

      const result = await controller.updateMe({ sub: userId }, updateDto);

      expect(service.findAll).toHaveBeenCalledWith({
        page: '1',
        limit: '1',
        user_id: { eq: userId },
        fields: '_id',
      });
      expect(service.update).toHaveBeenCalledWith({
        ...updateDto,
        user_id: userId,
      });
      expect(result).toEqual(updatedProfile);
    });

    it('should create a new profile if not existing', async () => {
      const userId = 'testUserId';
      const updateDto = {
        name: 'Updated Name',
        gender: 'P',
        birt_date: new Date('2000-03-29'),
        height: '1',
        weight: '2',
        is_active: true,
        interest: ['coding'],
      };
      const newProfile = { ...updateDto, user_id: userId };

      jest.spyOn(service, 'findAll').mockResolvedValue({
        data: [],
      });

      jest.spyOn(service, 'create').mockResolvedValue(newProfile);

      const result = await controller.updateMe({ sub: userId }, updateDto);

      expect(service.findAll).toHaveBeenCalledWith({
        page: '1',
        limit: '1',
        user_id: { eq: userId },
        fields: '_id',
      });
      expect(service.create).toHaveBeenCalledWith({
        ...updateDto,
        user_id: userId,
      });
      expect(result).toEqual(newProfile);
    });
  });
});

describe('VolunteerService', () => {
  let service: VolunteerService;
  let profileClientService: ProfileClientService;
  let userClientService: UserClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerService,
        {
          provide: ProfileClientService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UserClientService,
          useValue: {
            remove: jest.fn(),
          },
        },
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            info: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VolunteerService>(VolunteerService);
    profileClientService =
      module.get<ProfileClientService>(ProfileClientService);
    userClientService = module.get<UserClientService>(UserClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Tests for create method
  describe('create', () => {
    it('should create a new volunteer profile', async () => {
      const createProfileDto = {
        name: 'Updated Name',
        gender: 'P',
        birt_date: new Date('2000-03-29'),
        height: '1',
        weight: '2',
        is_active: true,
        interest: ['coding'],
      };
      const createdProfile = {
        ...createProfileDto,
        _id: 'testId',
        user_id: '',
      };

      jest
        .spyOn(profileClientService, 'create')
        .mockResolvedValue(createdProfile);

      const result = await service.create(createProfileDto);

      expect(profileClientService.create).toHaveBeenCalledWith(
        createProfileDto,
      );
      expect(result).toEqual(createdProfile);
    });

    it('should throw an error if profile creation fails', async () => {
      const createProfileDto = { name: 'Test User', email: 'test@example.com' };

      jest
        .spyOn(profileClientService, 'create')
        .mockRejectedValue(new Error('Failed to create profile'));

      await expect(service.create(createProfileDto)).rejects.toThrow(
        'Failed to create profile',
      );
    });
  });

  // Tests for findAll method
  describe('findAll', () => {
    it('should return all volunteer profiles', async () => {
      const query = { page: 1, limit: 10 };
      const profiles = [{ name: 'Test User', email: 'test@example.com' }];

      jest.spyOn(profileClientService, 'findAll').mockResolvedValue(profiles);

      const result = await service.findAll(query);

      expect(profileClientService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(profiles);
    });
  });

  // Tests for findOne method
  describe('findOne', () => {
    it('should return a volunteer profile by id', async () => {
      const id = 'testId';
      const profile = {
        name: 'Updated Name',
        gender: 'P',
        birt_date: new Date('2000-03-29'),
        height: '1',
        weight: '2',
        is_active: true,
        interest: ['coding'],
        user_id: '',
      };

      jest.spyOn(profileClientService, 'findOne').mockResolvedValue(profile);

      const result = await service.findOne(id);

      expect(profileClientService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(profile);
    });

    it('should throw NotFoundException if profile not found', async () => {
      const id = 'testId';

      jest.spyOn(profileClientService, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  // Tests for update method
  describe('update', () => {
    it('should update a volunteer profile', async () => {
      const updateProfileDto = {
        name: 'Updated Name',
        gender: 'P',
        birt_date: new Date('2000-03-29'),
        height: '1',
        weight: '2',
        is_active: true,
        interest: ['coding'],
        user_id: '',
      };
      const updatedProfile = { ...updateProfileDto };

      jest
        .spyOn(profileClientService, 'update')
        .mockResolvedValue(updatedProfile);

      const result = await service.update(updateProfileDto);

      expect(profileClientService.update).toHaveBeenCalledWith(
        updateProfileDto,
      );
      expect(result).toEqual(updatedProfile);
    });

    it('should throw an error if profile update fails', async () => {
      const updateProfileDto = {
        id: 'testId',
        name: 'Updated User',
        email: 'updated@example.com',
      };

      jest
        .spyOn(profileClientService, 'update')
        .mockRejectedValue(new Error('Failed to update profile'));

      await expect(service.update(updateProfileDto)).rejects.toThrow(
        'Failed to update profile',
      );
    });
  });

  // Tests for remove method
  describe('remove', () => {
    it('should remove a volunteer profile by id', async () => {
      const id = 'testId';
      const profile = {
        name: 'Updated Name',
        gender: 'P',
        birt_date: new Date('2000-03-29'),
        height: '1',
        weight: '2',
        is_active: true,
        interest: ['coding'],
        user_id: 'ada',
      };

      jest
        .spyOn(profileClientService, 'remove')
        .mockResolvedValue({ deleted: 1 });
      jest.spyOn(profileClientService, 'findOne').mockResolvedValue(profile);
      jest.spyOn(userClientService, 'remove').mockResolvedValue({});

      await service.remove(id);

      expect(profileClientService.remove).toHaveBeenCalledWith(id);
      expect(userClientService.remove).toHaveBeenCalledWith(profile.user_id);
    });

    it('should throw NotFoundException if profile not found', async () => {
      const id = 'testId';

      jest
        .spyOn(profileClientService, 'remove')
        .mockResolvedValue({ deleted: 0 });

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
