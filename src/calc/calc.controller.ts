// calc.controller.ts

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CalcService } from './calc.service';
import { CalcDto } from './calc.dto';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) {}

  @Post()
  calculateExpression(@Body() calcBody: CalcDto): { result: number } {
    try {
      const result = this.calcService.calculateExpression(calcBody);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid expression provided',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
