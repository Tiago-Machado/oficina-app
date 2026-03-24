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

---

## Monitoramento e Observabilidade

### Cloud Monitoring — Google Cloud Operations Suite

O sistema utiliza o Cloud Operations Suite nativo do GCP para monitoramento completo:

### Dashboard Operacional

Dashboard customizado em **Cloud Monitoring** com os seguintes widgets:

| Widget | Métrica | Descrição |
|--------|---------|-----------|
| CPU Utilization | `kubernetes.io/container/cpu/core_usage_time` | Uso de CPU dos pods em tempo real |
| Memory Usage | `kubernetes.io/container/memory/used_bytes` | Consumo de memória dos pods |
| Volume de OS | `logging.googleapis.com/user/os_criadas` | Ordens de serviço criadas por período |
| Erros e Falhas | Logs com severity=ERROR | Erros na aplicação em tempo real |
| DB Connections | `cloudsql.googleapis.com/database/network/connections` | Conexões ativas no Cloud SQL |

### Uptime Check

Verificação automática do health da API a cada 5 minutos:
- **Endpoint:** `http://136.119.72.139/api/v1/health`
- **Protocolo:** HTTP
- **Frequência:** 5 minutos
- **Notificação:** alerta em caso de falha

### Alertas Configurados

| Alerta | Condição | Duração |
|--------|----------|---------|
| CPU Alta | CPU > 80% | 2 minutos |
| Uptime Fail | Health check falha | Imediato |

### Logs Estruturados

A aplicação utiliza **Winston** para logs em formato JSON com os seguintes campos:
- `timestamp` — data/hora do evento
- `level` — nível do log (info, error, warn)
- `context` — módulo/controller que gerou o log
- `message` — descrição do evento

Exemplo de log:
```json
{
  "context": "RouterExplorer",
  "level": "info",
  "message": "Mapped {/api/v1/ordens-servico, POST} route",
  "timestamp": "2026-03-24T00:09:47.726Z"
}
```

### Acompanhamento de Ordens de Serviço

Através dos logs estruturados é possível acompanhar cada mudança de status da OS com timestamp, permitindo calcular o tempo médio entre transições:
```
RECEBIDA → DIAGNOSTICO → AGUARDANDO_APROVACAO → EM_EXECUCAO → FINALIZADA → ENTREGUE
```

Cada transição gera um log com timestamp, possibilitando análise de tempo médio de Diagnóstico, Execução e Finalização via Logs Explorer.

### Acesso ao Monitoramento

- **Dashboard:** [Cloud Monitoring Dashboard](https://console.cloud.google.com/monitoring/dashboards?project=oficina-mecanica-fiap)
- **Uptime Checks:** [Uptime Monitoring](https://console.cloud.google.com/monitoring/uptime?project=oficina-mecanica-fiap)
- **Alertas:** [Alerting Policies](https://console.cloud.google.com/monitoring/alerting?project=oficina-mecanica-fiap)
- **Logs:** [Logs Explorer](https://console.cloud.google.com/logs?project=oficina-mecanica-fiap)

## Endpoints Ativos

| Componente | URL |
|---|---|
| API Principal | http://136.119.72.139/api/v1/ |
| Swagger | http://136.119.72.139/api/docs |
| Auth CPF (Cloud Function) | https://us-central1-oficina-mecanica-fiap.cloudfunctions.net/oficina-auth |
| API Gateway (Traefik) | http://35.222.230.254 |
| Health Check | http://136.119.72.139/api/v1/health |
