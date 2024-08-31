import { Module } from '@nestjs/common';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Measure, MeasureSchema } from './measure.model';
import { GeminiModule } from '../../shared/gemini/gemini.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Measure.name, schema: MeasureSchema }]),
    GeminiModule,
  ],
  controllers: [MeasureController],
  providers: [MeasureService],
})
export class MeasureModule {}
