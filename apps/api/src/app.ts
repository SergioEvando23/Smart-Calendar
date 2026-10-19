import cors from '@fastify/cors';
import Fastify, { type FastifyInstance } from 'fastify';
import type { ApiConfig } from './config.js';

export interface DatabaseProbe { $queryRawUnsafe(query: string): Promise<unknown>; }

export function buildApp(config: ApiConfig, database: DatabaseProbe): FastifyInstance {
  const app = Fastify({ logger: true });
  app.register(cors, { origin: config.webOrigin, methods: ['GET'] });

  app.get('/health/live', async () => ({ status: 'ok' }));
  app.get('/health/ready', async (_request, reply) => {
    try {
      await database.$queryRawUnsafe('SELECT 1');
      return { status: 'ok', database: 'available' };
    } catch (error) {
      app.log.error(error, 'Database readiness probe failed');
      return reply.code(503).send({ status: 'unavailable', database: 'unavailable' });
    }
  });

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    reply.code(500).send({ error: 'Internal server error' });
  });
  return app;
}
