import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsOptional } from 'class-validator';

@Schema()
export class Measure {
  @Prop()
  measureUUID: string;

  @Prop()
  image: string;

  @Prop()
  customerCode: string;

  @Prop()
  @IsOptional()
  measureDatetime: Date;

  @Prop()
  measureValue: number;

  @Prop()
  measureType: string;

  @Prop()
  @IsOptional()
  confirmedValue: number;

  @Prop()
  @IsBoolean()
  hasConfirmed: boolean;

  @Prop()
  imageLink: string;
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);
