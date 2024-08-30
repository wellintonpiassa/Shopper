import { Measure } from '../measure.entity';

export class MeasureListResponseDto {
  customer_code: string;
  measures: Measure[];
}
