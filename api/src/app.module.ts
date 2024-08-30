import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasureModule } from './modules/measures/measure.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.22.0.1:27017/shopper'),
    MeasureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
