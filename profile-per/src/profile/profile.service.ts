import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfile } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './entities/profile.entity';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { RpcException } from '@nestjs/microservices';
import mongoose from 'mongoose';
import { APIFeatures } from '../common/utils/apiFeatures';

import { HoroscopeService } from '../horoscope/horoscope.service';
import { ZozdiacService } from '../zozdiac/zozdiac.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly volunterModel: SoftDeleteModel<ProfileDocument>,
    private readonly zodiacService: ZozdiacService,
    private readonly horoscopeService: HoroscopeService,
  ) {}
  async create(createVolunteerDto: CreateProfile) {
    const jodiac = await this.zodiacService.findHoroscopeByDate(
      createVolunteerDto.birt_date,
    );
    const horoscope = await this.horoscopeService.findHoroscopeByDate(
      createVolunteerDto.birt_date,
    );

    try {
      createVolunteerDto.zodiac = jodiac['zodiac'];
      createVolunteerDto.horoscope = horoscope[0]['horoscope'];
      return await this.volunterModel.create(createVolunteerDto);
    } catch (error) {
      if (error.code === 11000) {
        const duplicateKey = error.keyValue
          ? Object.keys(error.keyValue)[0]
          : '';
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `${duplicateKey} sudah digunakan`,
        });
      }
      throw error;
    }
  }

  async findAll(queryString: any) {
    try {
      const features = new APIFeatures(this.volunterModel.find(), queryString)
        .filter()
        .sorting()
        .limitFields();

      let $Object = JSON.parse(features.filterData);

      if (queryString['blazz']) {
        delete $Object['blazz'];
      }

      const totalItems = await this.volunterModel.countDocuments($Object);
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
      throw error;
    }
  }

  async findOne(_id: string) {
    return await this.volunterModel.findOne({ user_id: _id });
  }

  async update(updateVolunteerDto: UpdateProfileDto) {
    let userId = updateVolunteerDto.user_id;
    delete updateVolunteerDto.user_id;
    // console.log(updateVolunteerDto);
    // return updateVolunteerDto;
    console.log(userId);

    try {
      const updateUser = await this.volunterModel.findOneAndUpdate(
        {
          user_id: userId,
        },
        { ...updateVolunteerDto },
        {
          new: true,
        },
      );
      if (!updateUser) {
        //create user
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
          message: `${duplicateKey} sudah digunakan`,
        });
      }
      throw error;
    }
  }

  async remove(_id: string) {
    return await this.volunterModel.softDelete({
      _id,
    });
  }

  async removeMany(payload: any) {
    return await this.volunterModel.deleteMany(payload);
  }

  async updateManyStatus(payload: any) {
    return await this.volunterModel.updateMany(
      {
        user_id: { $in: payload.volunteer },
        isDeleted: false,
      },
      { $set: { is_active: payload.is_active } },
    );
  }
}
