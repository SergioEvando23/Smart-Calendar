import { useEffect, useState } from 'react';
import { fetchReadiness } from './api';
type Connection = 'checking' | 'connected' | 'unavailable';
export function App() {
  const [connection, setConnection] = useState<Connection>('checking');
  useEffect(() => { void fetchReadiness().then(() => setConnection('connected')).catch(() => setConnection('unavailable')); }, []);
  const label = connection === 'checking' ? 'Verificando API…' : connection === 'connected' ? 'API disponível' : 'API indisponível';
  return <main><h1>Agenda Inteligente</h1><p>Fundação técnica da aplicação.</p><p role="status" data-status={connection}>{label}</p></main>;
}
