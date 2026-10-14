# Decisões arquiteturais confirmadas

Este documento registra somente decisões presentes no planejamento do escopo 01.01.

| Decisão | Origem | Impacto |
| --- | --- | --- |
| Adotar um monorepo sem Nx ou Turborepo inicialmente. | Planejamento 01.01 | Aplicações, pacotes e infraestrutura coexistem no mesmo repositório sem ferramenta de orquestração adicionada. |
| Delimitar `apps`, `packages`, `infra`, `docs` e `public`. | Planejamento 01.01 | Responsabilidades ficam separadas desde o início. |
| Usar Docker Compose para infraestrutura local. | Planejamento 01.01 | Serviços locais são declarados em `compose.yaml`. |
| Usar PostgreSQL privado com volume persistente. | Planejamento 01.01 | O banco não publica portas e usa o volume nomeado `postgres_data`. |
| Disponibilizar Ollama somente por perfil opcional. | Planejamento 01.01 | A infraestrutura padrão inicia sem Ollama; o perfil `ollama` o habilita quando necessário. |
| Manter paridade de regras de negócio entre Web e Mobile. | Planejamento 01.01 | Nenhuma regra de negócio foi criada neste escopo; futuras implementações devem preservar essa diretriz. |

## Pendências de arquitetura

As stacks de `apps/web`, `apps/mobile` e `apps/api`, bem como as responsabilidades concretas de `packages/shared` e `packages/contracts`, não estavam documentadas no repositório. Portanto, não foram escolhidas nem geradas neste escopo.
