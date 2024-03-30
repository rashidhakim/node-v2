import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './middleware/logging.middleware'; // Import the missing module
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggingMiddleware().use); // Direct application
  await app.listen(3000);
}
bootstrap();
