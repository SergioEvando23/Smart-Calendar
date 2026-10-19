import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';
vi.mock('./api', () => ({ fetchReadiness: () => Promise.resolve({ status: 'ok' }) }));
describe('App', () => { it('shows the technical identity and connectivity result', async () => { render(<App />); expect(screen.getByText('Agenda Inteligente')).toBeTruthy(); expect(await screen.findByText('API disponível')).toBeTruthy(); }); });
