import { MeasureService } from './measure.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { MeasureUploadDto } from './dto/measure-upload.dto';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { MeasureListDto } from './dto/measure-list-response.dto';

@Controller()
export class MeasureController {
  constructor(private measureService: MeasureService) {}

  @Post('/upload')
  async update(
    @Body() measureUpload: MeasureUploadDto,
    @Res() res: Response,
  ): Promise<Response> {
    const payload = plainToInstance(MeasureUploadDto, measureUpload);
    try {
      await validateOrReject(payload);
      return res
        .status(HttpStatus.OK)
        .send(await this.measureService.upload(measureUpload));
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }

  @Patch('/confirm')
  async confirm() {}

  @Get(':customer_code/list')
  async list(
    @Res() res: Response,
    @Param('customer_code') customer_code: string,
    @Query('measure_type') measure_type?: string,
  ) {
    try {
      let query = null;
      if (measure_type) {
        query = plainToInstance(MeasureListDto, {
          MeasureType: measure_type,
        });
        await validateOrReject(query);
      }
      return res
        .status(HttpStatus.OK)
        .send(await this.measureService.list(query, customer_code));
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }
}
