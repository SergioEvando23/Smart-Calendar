# Agenda Inteligente

Fundação técnica de uma aplicação Web e Mobile para organização de agendas e planejamento inteligente. O escopo atual entrega o bootstrap técnico; nenhuma funcionalidade de negócio foi implementada.

## Estrutura

```text
apps/web/             Interface React + TypeScript
apps/api/             API Node.js + Fastify + Prisma
apps/mobile/          Plataforma pendente de definição arquitetural
packages/             Espaço reservado para código compartilhado e contratos
infra/docker/         Materiais complementares de infraestrutura
docs/architecture/    Decisões arquiteturais confirmadas
docs/scopes/          Relatórios dos escopos implementados
compose.yaml          Serviços locais
```

## Pré-requisitos

- Node.js 22+ e npm 10+
- Docker Desktop com Docker Compose v2
- PowerShell 7+ para a validação estrutural no Windows

## Configuração e execução local

1. Copie `.env.example` para `.env` e substitua `POSTGRES_PASSWORD` por uma senha local exclusiva.
2. Instale dependências e gere o Prisma Client:

   ```powershell
   npm install
   npm run prisma:generate --workspace=@agenda/api
   ```

3. Inicie Web, API e PostgreSQL:

   ```powershell
   docker compose up -d --build
   ```

4. Abra `http://localhost:8080`. A página técnica consulta a prontidão da API.

O PostgreSQL e a API não publicam portas no host. A Web é o único serviço exposto localmente, pela porta configurada em `WEB_PORT`. Os serviços internos usam `postgres:5432` e `api:3000` na rede privada.

Para iniciar Ollama, que é opcional e independente da prontidão da aplicação:

```powershell
docker compose --profile ollama up -d ollama
```

Para encerrar os serviços sem apagar dados persistentes:

```powershell
docker compose down
```

## Desenvolvimento e validação

```powershell
npm run dev:api
npm run dev:web
pwsh -File scripts/validate-foundation.ps1
npm run check
npm test
npm run build
docker compose config --quiet
```

## Git Flow e contribuição

- `main` representa produção; `develop`, integração.
- Use `feature/*`, `fix/*`, `release/*` e `hotfix/*` conforme a finalidade.
- Pull Requests exigem aprovação humana e devem usar **Merge Commit**. Squash e rebase merge não são permitidos.
- Não inclua `.env`, senhas, tokens ou outros segredos no repositório.
- Antes de abrir um PR, execute as validações aplicáveis e atualize o relatório do escopo correspondente.
