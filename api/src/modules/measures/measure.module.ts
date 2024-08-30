import { Module } from '@nestjs/common';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasureSchema } from './measure.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Measure', schema: MeasureSchema }]),
  ],
  controllers: [MeasureController],
  providers: [MeasureService],
})
export class MeasureModule {}
