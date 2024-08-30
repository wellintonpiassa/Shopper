import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measure } from './measure.entity';
import { isValidObjectId, Model } from 'mongoose';
import {
  MeasureUploadDto,
  MeasureUploadResponseDto,
} from './dto/measure-upload.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MeasureService {
  constructor(
    @InjectModel(Measure.name) private measureModel: Model<Measure>,
  ) {}

  async upload(
    measureUploadDto: MeasureUploadDto,
  ): Promise<MeasureUploadResponseDto> {
    const measure = new this.measureModel(measureUploadDto);
    const savedModel = await measure.save();
    if (isValidObjectId(savedModel._id)) {
      return plainToInstance(MeasureUploadResponseDto, savedModel, {
        excludeExtraneousValues: true,
      });
    }
  }

  async confirm(measureUploadDto: MeasureUploadDto) {}

  async list(measureUploadDto: MeasureUploadDto) {}
}
