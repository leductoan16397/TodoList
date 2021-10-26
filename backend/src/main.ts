import { bootstrapServer } from './app';

async function bootstrap() {
  const { app } = await bootstrapServer();
  await app.listen(3000);
}

bootstrap();
