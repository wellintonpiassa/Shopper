import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum measureTypes {
  WATER = 'water',
  GAS = 'gas',
}

@Schema()
export class Measure {
  @Prop()
  UUID: string;

  @Prop()
  image: string;

  @Prop()
  customerCode: string;

  @Prop()
  measureDatetime: Date;

  @Prop()
  type: measureTypes;

  @Prop()
  confirmedValue: boolean;
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);
