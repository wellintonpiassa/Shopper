import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class MeasureConfirmDto {
  @Expose({ name: 'measure_uuid' })
  @IsString()
  measureUUID: string;

  @Expose({ name: 'confirmed_value' })
  @IsBoolean()
  confirmedValue: number;
}

export class MeasureConfirmResponseDto {
  success: boolean;
}
