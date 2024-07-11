import { User, UserDocument } from './schema/app.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { HashingService } from '../hashing.service';
import { RpcException } from '@nestjs/microservices';
import { APIFeatures } from '../common/utils/apiFeatures';
import mongoose from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
    private readonly hashingService: HashingService,
  ) {}

  async create(payload: any) {
    payload.password = await this.hashingService.hash(payload.password);
    try {
      const { _id, username, role, applications } =
        await this.userModel.create(payload);
      return { _id, username, role, applications };
    } catch (error) {
      if (error.code === 11000) {
        const duplicateKey = error.keyValue
          ? Object.keys(error.keyValue)[0]
          : '';
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: {
            [`${duplicateKey}`]: [`${duplicateKey} already exist`],
          },
        });
      }
      throw error;
    }
  }
  async findAll(queryString: any): Promise<any> {
    try {
      const features = new APIFeatures(this.userModel.find(), queryString)
        .filter()
        .sorting()
        .limitFields();

      const totalItems = await this.userModel.countDocuments(
        JSON.parse(features.filterData),
      );
      const result = await features.pagination();
      const totalPages = Math.ceil(totalItems / features.limit);
      const reportData = {
        paging: {
          page: features.page,
          size: features.limit,
          totalItems: totalItems,
          totalPages: totalPages !== Infinity ? totalPages : 0,
        },
        data: result,
      };

      return reportData;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Silahkan cek query anda`,
        });
      }

      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Silahkan cek query anda`,
      }); // Re-throw the error for proper handling
    }
  }

  async get(payload: string) {
    return await this.userModel.findOne(
      { _id: payload },
      {
        username: 1,
        tenant_id: 1,
        role: 1,
        applications: 1,
      },
    );
  }

  async delete(userId: string) {
    const deleteUser = await this.userModel.softDelete({
      _id: userId,
    });
    return deleteUser;
  }
  async findOne(userId: string) {
    return await this.userModel.findById(userId);
  }

  async update(payload: any) {
    const data = payload.data;
    if (Object.keys(data).includes('password')) {
      data.password = await this.hashingService.hash(data.password);
    }
    try {
      const updateUser = await this.userModel.findOneAndUpdate(
        {
          _id: payload.userId,
        },
        data,
        {
          new: true,
        },
      );
      if (!updateUser) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `user with _id ${payload.userId} not found`,
        });
      }
      return updateUser;
    } catch (error) {
      // mongoose.Error
      if (error.code === 11000) {
        const duplicateKey = error.keyValue
          ? Object.keys(error.keyValue)[0]
          : '';
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: {
            [`${duplicateKey}`]: [`${duplicateKey} already exist`],
          },
        });
      }
      throw error;
    }
  }

  async findByIdentifier(identifier: string) {
    return await this.userModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
      isDeleted: false,
      applications: { $exists: true, $ne: null },
    });
  }

  async removeMany(payload: any) {
    return await this.userModel.deleteMany(payload);
  }
}
