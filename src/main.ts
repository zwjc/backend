import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Helmet for secure headers
  app.use(helmet());

  // 2. CORS
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true,
  }));

  // 3. Rate‑limiting
  app.use(rateLimit.default({
    windowMs: 60 * 1000,
    max: 100,
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
