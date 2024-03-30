import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CalcModule } from './calc/calc.module';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [CalcModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*'); // Apply for all routes
  }
}
