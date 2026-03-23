# RFC-002: Estratégia de Infraestrutura Cloud e Repositórios

## Resumo
Proposta de organização da infraestrutura em 4 repositórios independentes com CI/CD, usando GCP como provedor de nuvem.

## Motivação
A evolução do sistema de monolito local para operação corporativa exige separação de responsabilidades, deploy independente e infraestrutura como código.

## Proposta

### Estrutura de Repositórios

| Repo | Responsabilidade | CI/CD |
|------|-----------------|-------|
| oficina-auth-lambda | Cloud Function autenticação CPF | Build → Deploy Function |
| oficina-infra-db | Terraform: VPC + Cloud SQL + Secrets | Validate → Plan → Apply |
| oficina-infra-k8s | Terraform: GKE + API Gateway + Registry | Validate → Plan → Apply |
| oficina-app | Aplicação NestJS + K8s manifests | Build → Docker → Push → Deploy GKE |

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                    Google Cloud Platform                      │
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ API Gateway   │───►│Cloud Function│    │ Cloud         │  │
│  │ (roteamento)  │    │ (auth CPF)   │    │ Monitoring    │  │
│  └──────┬───────┘    └──────┬───────┘    │ + Logging     │  │
│         │                    │            │ + Alerting    │  │
│  ┌──────▼───────┐           │            └───────────────┘  │
│  │ GKE Cluster   │          │                                │
│  │ ┌──────────┐ │          │            ┌───────────────┐  │
│  │ │oficina   │ │          │            │ Artifact      │  │
│  │ │app (2-10)│ │          │            │ Registry      │  │
│  │ │+ HPA     │ │          │            └───────────────┘  │
│  │ └────┬─────┘ │          │                                │
│  └──────┼───────┘          │                                │
│         │                   │                                │
│  ┌──────▼──────────────────▼──┐    ┌──────────────────┐    │
│  │  VPC (oficina-vpc)          │    │ Secret Manager   │    │
│  │  ┌───────────────────────┐ │    │ - db-password    │    │
│  │  │ Cloud SQL PostgreSQL  │ │    │ - jwt-secret     │    │
│  │  │ (Private IP only)     │ │    └──────────────────┘    │
│  │  └───────────────────────┘ │                              │
│  └────────────────────────────┘                              │
└─────────────────────────────────────────────────────────────┘
```

### Ordem de Provisionamento
1. oficina-infra-db (VPC + Cloud SQL + Secrets)
2. oficina-infra-k8s (GKE + API Gateway — depende da VPC)
3. oficina-auth-lambda (Cloud Function — depende do Cloud SQL)
4. oficina-app (Deploy no GKE — depende de tudo acima)

### Regras de Proteção de Branch
- Branch `main` protegida — sem commits diretos
- Pull Requests obrigatórios para merge
- CI deve passar antes do merge
- Deploy automático ao merge na main

## Impacto
- Cada repo é independente e deployável separadamente
- Terraform state armazenado em bucket GCS compartilhado
- Service Account compartilhada entre pipelines
