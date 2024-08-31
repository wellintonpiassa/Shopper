import { Expose } from 'class-transformer';
import {
  IsBase64,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export enum measureTypes {
  WATER = 'water',
  GAS = 'gas',
}

export class MeasureUploadDto {
  @Expose()
  @IsBase64()
  @IsNotEmpty()
  readonly image: string;

  @Expose({ name: 'customer_code' })
  @IsString()
  @IsNotEmpty()
  readonly customerCode: string;

  @Expose({ name: 'measure_datetime' })
  @IsISO8601()
  readonly measureDatetime: Date;

  @Expose({ name: 'measure_type' })
  @IsEnum(measureTypes)
  @IsNotEmpty()
  readonly measureType: measureTypes;
}

export class MeasureUploadResponseDto {
  @Expose({ name: 'image_link' })
  imageLink: string;

  @Expose({ name: 'measure_value' })
  measureValue: number;

  @Expose({ name: 'measure_uuid' })
  measureUUID: string;
}
