import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const authService = app.get(AuthService);

  // Ініціалізація користувачів при запуску
  await authService.initializeUsers();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
