import { describe, expect, it } from 'vitest';
import { ApiError, fetchReadiness } from './api';
describe('fetchReadiness', () => {
  it('returns a valid readiness response', async () => {
    const result = await fetchReadiness(async () => new Response(JSON.stringify({ status: 'ok', database: 'available' }), { status: 200 }), 20);
    expect(result.status).toBe('ok');
  });
  it('normalizes network failures', async () => {
    await expect(fetchReadiness(async () => { throw new TypeError('network'); }, 20)).rejects.toBeInstanceOf(ApiError);
  });
});
