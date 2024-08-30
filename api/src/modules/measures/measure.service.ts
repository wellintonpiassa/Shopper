import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measure } from './measure.entity';
import { isValidObjectId, Model } from 'mongoose';
import {
  MeasureUploadDto,
  MeasureUploadResponseDto,
} from './dto/measure-upload.dto';
import { plainToInstance } from 'class-transformer';
import { GeminiService } from '../../shared/gemini/gemini.service';

const PROMPT = 'What value is showing on the meter? only number';

@Injectable()
export class MeasureService {
  constructor(
    @InjectModel(Measure.name) private measureModel: Model<Measure>,
    private gemini: GeminiService,
  ) {}

  async upload(
    measureUploadDto: MeasureUploadDto,
  ): Promise<MeasureUploadResponseDto> {
    const measure = new this.measureModel(measureUploadDto);
    const uploadedFile = await this.gemini.uploadImage(measureUploadDto.image);
    measure.imageLink = uploadedFile.uri;
    const value = await this.gemini.process(PROMPT, uploadedFile);
    if (Number(value)) {
      measure.measureValue = parseFloat(value);
    }
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
