import { Injectable, BadRequestException } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto): any {
    const { expression } = calcBody;
    try {
      const result = this.evaluateExpression(expression);
      return { result };
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid expression provided',
        error: 'Bad Request',
      });
    }
  }

  private evaluateExpression(expression: string): number {
    // Regular expression to match numbers (including decimal numbers) and operators
    const tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/)/g);

    if (!tokens) {
      throw new Error('Invalid expression');
    }

    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNumber = parseFloat(tokens[i + 1]);

      if (isNaN(nextNumber)) {
        throw new Error('Invalid expression');
      }

      switch (operator) {
        case '+':
          result += nextNumber;
          break;
        case '-':
          result -= nextNumber;
          break;
        case '*':
          result *= nextNumber;
          break;
        case '/':
          if (nextNumber === 0) throw new Error('Division by zero');
          result /= nextNumber;
          break;
        default:
          throw new Error('Invalid operator');
      }
    }

    return result;
  }
}
