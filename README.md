# Agenda Inteligente

Fundação técnica de uma aplicação Web e Mobile para organização de agendas e planejamento inteligente. O escopo atual prepara a estrutura e a infraestrutura local; ele não implementa funcionalidades de negócio.

## Estrutura

```text
apps/                 Aplicações Web, Mobile e API (stacks pendentes de definição)
packages/             Código compartilhado e contratos (responsabilidades pendentes)
infra/docker/         Materiais de infraestrutura Docker futuros
docs/architecture/    Decisões arquiteturais confirmadas
docs/scopes/          Relatórios dos escopos implementados
public/inspiration/   Referências visuais preservadas
scripts/              Validações independentes de stack
compose.yaml          Infraestrutura local
```

## Pré-requisitos

- Git
- Docker Desktop com Docker Compose v2
- PowerShell 7+ (para a validação estrutural no Windows)

As stacks de aplicação ainda não foram aprovadas, portanto não há gerenciador de pacotes ou comandos de desenvolvimento de aplicações neste momento.

## Configuração e execução local

1. Copie `.env.example` para `.env`.
2. Altere `POSTGRES_PASSWORD` no arquivo `.env` para uma senha local exclusiva.
3. Inicie apenas a infraestrutura padrão:

   ```powershell
   docker compose up -d postgres
   ```

4. Confira a saúde do banco:

   ```powershell
   docker compose ps
   ```

O PostgreSQL não publica porta no host. Aplicações que forem adicionadas ao Compose devem acessar `postgres:5432` pela rede privada.

Para iniciar Ollama, que é opcional e independente do PostgreSQL:

```powershell
docker compose --profile ollama up -d ollama
```

Para encerrar os serviços sem apagar os dados persistentes:

```powershell
docker compose down
```

## Validação

```powershell
pwsh -File scripts/validate-foundation.ps1
docker compose config
```

## Git Flow e contribuição

- `main` representa produção; `develop`, integração.
- Use `feature/*`, `fix/*`, `release/*` e `hotfix/*` conforme a finalidade.
- Pull Requests exigem aprovação humana e devem usar **Merge Commit**. Squash e rebase merge não são permitidos.
- Não inclua `.env`, senhas, tokens ou outros segredos no repositório.
- Antes de abrir um PR, execute as validações aplicáveis e atualize o relatório do escopo correspondente.

## Próximos passos

Definir e registrar as tecnologias de Web, Mobile e API antes de gerar aplicações ou configurar lint, formatação e testes específicos dessas stacks.
