import { Expose } from 'class-transformer';
import { IsBoolean, IsUUID } from 'class-validator';

export class MeasureConfirmDto {
  @Expose({ name: 'measure_uuid' })
  @IsUUID()
  measureUUID: string;

  @Expose({ name: 'confirmed_value' })
  @IsBoolean()
  confirmedValue: boolean;
}

export class MeasureConfirmResponseDto {
  success: boolean;
}
