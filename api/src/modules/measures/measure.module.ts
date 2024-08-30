import { Module } from '@nestjs/common';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasureSchema } from './measure.entity';
import { GeminiModule } from '../../shared/gemini/gemini.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Measure', schema: MeasureSchema }]),
    GeminiModule,
  ],
  controllers: [MeasureController],
  providers: [MeasureService],
})
export class MeasureModule {}
