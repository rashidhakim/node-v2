import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    
    // Function to execute after the response is sent
    res.on('finish', () => {
      const duration = Date.now() - start;
      const log = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;
      console.log(log);
    });

    next();
  }
}
