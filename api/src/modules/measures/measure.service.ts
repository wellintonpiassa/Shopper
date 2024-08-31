import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measure } from './measure.model';
import { Model } from 'mongoose';
import {
  MeasureUploadDto,
  MeasureUploadResponseDto,
} from './dto/measure-upload.dto';
import { GeminiService } from '../../shared/gemini/gemini.service';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { MeasureConfirmDto } from './dto/measure-confirm.dto';
import { MeasureListDto } from './dto/measure-list-response.dto';

const PROMPT = 'What value is showing on the meter? tell me only number';

@Injectable()
export class MeasureService {
  constructor(
    @InjectModel(Measure.name)
    private measureModel: Model<Measure>,
    private gemini: GeminiService,
  ) {}

  async upload(
    measureUploadDto: MeasureUploadDto,
  ): Promise<MeasureUploadResponseDto> {
    const uploadedFile = await this.gemini.uploadImage(measureUploadDto.image);
    let value = await this.gemini.process(PROMPT, uploadedFile);
    const measureDto = instanceToPlain(measureUploadDto);
    const measure = new this.measureModel({
      ...measureDto,
      measureValue: this.handleGeminiValue(value),
      imageLink: uploadedFile.uri,
    });
    const measureDoc = await measure.save();
    return plainToInstance(MeasureUploadResponseDto, measureDoc, {
      excludeExtraneousValues: true,
      ignoreDecorators: true,
    });
  }

  handleGeminiValue(value: string) {
    console.debug(value);
    if (value) {
      value = value.trim();
      value = value.replaceAll(' ', '');
      if (Number(value)) {
        return parseInt(value);
      } else {
        return undefined;
      }
    }
  }

  async confirm(measureConfirmDto: MeasureConfirmDto) {
    const measure = await this.measureModel.findById(
      measureConfirmDto.measureUUID,
    );
    if (!measure) {
      //   404 - Leitura não encontrada
    } else if (measure.confirmedValue) {
      //   409 - Leitura já confirmada
    } else {
      // update no objeto salvando o valor de confirmedValue e um atributo chamado hasConfirmed (boolean)
      //  200 - Operação realizada com sucesso
    }
  }

  async list(measureListDto: MeasureListDto, customerCode: string) {
    let filter = {};
    if (measureListDto.measureType) {
      filter = {
        measureType: measureListDto.measureType,
      };
    }
    const response = await this.measureModel
      .find(filter, {
        measureUUID: 1,
        measureDatetime: 1,
        measureType: 1,
        hasConfirmed: 1,
        imageUrl: 1,
      })
      .exec();
    return {
      customer_code: customerCode,
      measures: [...response],
    };
  }
}
