export interface HealthResponse { status: 'ok' | 'unavailable'; database?: 'available' | 'unavailable'; }
export class ApiError extends Error { constructor(message: string) { super(message); this.name = 'ApiError'; } }
const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';
export async function fetchReadiness(fetcher: typeof fetch = fetch, timeoutMs = 5000): Promise<HealthResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(`${baseUrl}/health/ready`, { signal: controller.signal });
    if (!response.ok) throw new ApiError('API indisponível.');
    const data: unknown = await response.json();
    if (!data || typeof data !== 'object' || !('status' in data) || (data as { status: unknown }).status !== 'ok') throw new ApiError('Resposta inválida da API.');
    return data as HealthResponse;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Não foi possível conectar à API.');
  } finally { clearTimeout(timeout); }
}
