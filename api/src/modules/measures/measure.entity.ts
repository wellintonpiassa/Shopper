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
  measureValue: number;

  @Prop()
  measureType: measureTypes;

  @Prop()
  confirmedValue: boolean;

  @Prop()
  imageLink: string;
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);
