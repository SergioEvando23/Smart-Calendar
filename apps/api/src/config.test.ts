import { describe, expect, it } from 'vitest';
import { loadConfig } from './config.js';

const valid = { DATABASE_URL: 'postgresql://user:pass@localhost:5432/db', WEB_ORIGIN: 'http://localhost:5173' };
describe('loadConfig', () => {
  it('accepts required configuration', () => expect(loadConfig(valid)).toMatchObject({ port: 3000 }));
  it('rejects missing required configuration', () => expect(() => loadConfig({ WEB_ORIGIN: valid.WEB_ORIGIN })).toThrow('DATABASE_URL is required'));
  it('rejects invalid allowed origins', () => expect(() => loadConfig({ ...valid, WEB_ORIGIN: 'invalid' })).toThrow('WEB_ORIGIN must be an absolute URL'));
});
