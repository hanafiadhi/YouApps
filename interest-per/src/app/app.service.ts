import { Application, ApplicationDocument } from './schema/app.schema';
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
    @InjectModel(Application.name)
    private readonly applicationModel: SoftDeleteModel<ApplicationDocument>,
    private readonly hashingService: HashingService,
  ) {}

  async create(payload: any) {
    try {
      const name = await this.applicationModel.create(payload);
      return name;
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
    }
  }

  async findAll(queryString: any): Promise<any> {
    try {
      const features = new APIFeatures(
        this.applicationModel.find(),
        queryString,
      )
        .filter()
        .sorting()
        .limitFields();

      const totalItems = await this.applicationModel.countDocuments(
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
    return await this.applicationModel.findOne(
      { _id: payload },
      {
        name: 1,
      },
    );
  }

  async delete(applicationId: string) {
    const deleteApplication = await this.applicationModel.softDelete({
      _id: applicationId,
    });
    return deleteApplication;
  }

  async update(payload: any) {
    const data = payload.data;
    try {
      const updateApplication = await this.applicationModel.findOneAndUpdate(
        {
          _id: payload.applicationId,
        },
        data,
        {
          new: true,
        },
      );
      if (!updateApplication) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `interest with ID ${payload.applicationId} not found`,
        });
      }
      return updateApplication;
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
    }
  }
}
