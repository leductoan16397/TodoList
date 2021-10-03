import { bootstrapServer } from './app';

async function bootstrap() {
  const app = (await bootstrapServer()).app;
  await app.listen(3000);
}

bootstrap();
