import { Expose } from 'class-transformer';
import {
  IsBase64,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
} from 'class-validator';

enum measureTypes {
  WATER = 'water',
  GAS = 'gas',
}

export class MeasureUploadDto {
  @Expose()
  @IsBase64()
  @IsNotEmpty()
  image: string;

  @Expose({ name: 'customer_code' })
  @IsString()
  @IsNotEmpty()
  customerCode: string;

  @Expose({ name: 'measure_datetime' })
  @IsISO8601()
  @IsNotEmpty()
  measureDatetime: Date;

  @Expose({ name: 'measure_type' })
  @IsEnum(measureTypes)
  @IsNotEmpty()
  type: measureTypes;
}

export class MeasureUploadResponseDto {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
}
