# Oficina Mecânica — Aplicação Principal

Aplicação NestJS (TypeScript) para gestão de oficina mecânica, executando em Google Kubernetes Engine (GKE).

## Arquitetura

```
┌──────────────────────────────────────────────┐
│         Presentation Layer                   │
│  - Controllers (REST API)                    │
│  - DTOs (validação de entrada/saída)        │
│  - JWT Auth Guard                            │
└───────────────┬──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────┐
│         Application Layer                    │
│  - Use Cases (regras de negócio)            │
│  - Orquestração de operações                │
└───────────────┬──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────┐
│         Domain Layer                         │
│  - Entities (Cliente, Veiculo, OS, etc)     │
│  - Value Objects (CPF, Email, Money, Placa) │
│  - Repository Interfaces                     │
└───────────────┬──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────┐
│         Infrastructure Layer                 │
│  - TypeORM (repositórios)                   │
│  - Cloud SQL PostgreSQL                      │
│  - JWT Auth + Winston Logging               │
└──────────────────────────────────────────────┘
```

## Tecnologias

- **NestJS** (TypeScript) — Framework principal
- **TypeORM** — ORM para PostgreSQL
- **PostgreSQL 16** — via Cloud SQL
- **Docker** — Containerização
- **Kubernetes** — Orquestração (GKE)
- **Winston** — Logs estruturados JSON
- **Swagger** — Documentação API
- **JWT** — Autenticação
- **GitHub Actions** — CI/CD

## Funcionalidades

- CRUD completo: Clientes, Veículos, Serviços, Peças
- Gestão de Ordens de Serviço com máquina de estados
- Controle de estoque com regras de domínio
- Autenticação JWT para rotas administrativas
- Consulta pública de status da OS
- Logs estruturados para observabilidade
- Validação de CPF/CNPJ e Placa

## Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/v1/auth/register | Registrar usuário | Não |
| POST | /api/v1/auth/login | Login | Não |
| GET | /api/v1/clientes | Listar clientes | JWT |
| POST | /api/v1/clientes | Criar cliente | JWT |
| PUT | /api/v1/clientes/:id | Atualizar cliente | JWT |
| DELETE | /api/v1/clientes/:id | Deletar cliente | JWT |
| GET | /api/v1/veiculos | Listar veículos | JWT |
| POST | /api/v1/veiculos | Criar veículo | JWT |
| GET | /api/v1/ordens-servico | Listar OS | JWT |
| POST | /api/v1/ordens-servico | Criar OS | JWT |
| GET | /api/v1/ordens-servico/:id/status | Consultar status | Público |
| PATCH | /api/v1/ordens-servico/:id/status | Atualizar status | JWT |
| PATCH | /api/v1/ordens-servico/:id/aprovar | Aprovar orçamento | JWT |

Swagger completo: `http://<host>/api/docs`

## Execução Local

```bash
# Com Docker Compose
docker-compose up -d

# Acesse: http://localhost:3000/api/docs
```

## Deploy no GKE

O deploy é automático via GitHub Actions ao fazer push na branch `main`.

### Secrets necessários:
- `GCP_PROJECT_ID`
- `GCP_SA_KEY`

## Autor

Tiago Machado — FIAP PosTech Software Architecture
