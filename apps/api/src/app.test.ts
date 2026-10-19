import { describe, expect, it } from 'vitest';
import { buildApp } from './app.js';

const config = { host: '127.0.0.1', port: 3000, webOrigin: 'http://localhost:5173' };
describe('technical health endpoints', () => {
  it('reports liveness', async () => {
    const app = buildApp(config, { $queryRawUnsafe: async () => 1 });
    const response = await app.inject('/health/live');
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
    await app.close();
  });
  it('reports readiness when the database is available', async () => {
    const app = buildApp(config, { $queryRawUnsafe: async () => 1 });
    const response = await app.inject('/health/ready');
    expect(response.statusCode).toBe(200);
    await app.close();
  });
  it('reports unavailable when the database probe fails', async () => {
    const app = buildApp(config, { $queryRawUnsafe: async () => { throw new Error('offline'); } });
    const response = await app.inject('/health/ready');
    expect(response.statusCode).toBe(503);
    expect(response.json()).toEqual({ status: 'unavailable', database: 'unavailable' });
    await app.close();
  });
});
