import { buildApp } from './app.js';
import { loadConfig } from './config.js';
import { prisma } from './prisma.js';

const config = loadConfig();
const app = buildApp(config, prisma);

const close = async (signal: string) => {
  app.log.info({ signal }, 'Shutting down');
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
};
process.once('SIGINT', () => void close('SIGINT'));
process.once('SIGTERM', () => void close('SIGTERM'));

try {
  await app.listen({ host: config.host, port: config.port });
} catch (error) {
  app.log.error(error, 'API failed to start');
  await prisma.$disconnect();
  process.exit(1);
}
