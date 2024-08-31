import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { measureTypes } from './measure-upload.dto';

export class MeasureListDto {
  @Expose({ name: 'measure_type' })
  @IsEnum(measureTypes)
  measureType: measureTypes;
}
