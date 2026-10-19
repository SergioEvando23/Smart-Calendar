export interface ApiConfig {
  host: string;
  port: number;
  webOrigin: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ApiConfig {
  const port = Number(env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port.');
  }
  const webOrigin = env.WEB_ORIGIN;
  if (!webOrigin) throw new Error('WEB_ORIGIN is required.');
  try { new URL(webOrigin); } catch { throw new Error('WEB_ORIGIN must be an absolute URL.'); }
  if (!env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
  return { host: env.HOST ?? '0.0.0.0', port, webOrigin };
}
