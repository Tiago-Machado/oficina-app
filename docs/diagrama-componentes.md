# Diagrama de Componentes — Visão Cloud
```
┌─────────────────────────────────────────────────────────────┐
│                 Google Cloud Platform (GCP)                   │
│                 Project: oficina-mecanica-fiap                │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Traefik (API Gateway/Ingress)              │  │
│  │              LoadBalancer: 35.222.230.254               │  │
│  │   /api/* ──► GKE Pods (oficina-app)                    │  │
│  └─────────────────────┬──────────────────────────────────┘  │
│                        │                                      │
│  ┌─────────────────────▼──────────────────────────────────┐  │
│  │  GKE Cluster: oficina-cluster (us-central1-a)          │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Namespace: oficina-mecanica                       │  │  │
│  │  │ oficina-app (NestJS) — 2 pods (HPA: 2-10)       │  │  │
│  │  │ Traefik Ingress Controller — 1 pod               │  │  │
│  │  │ ConfigMap: env vars | Secret: db-host, jwt       │  │  │
│  │  └──────────────────────┬───────────────────────────┘  │  │
│  └─────────────────────────┼──────────────────────────────┘  │
│                            │                                  │
│  ┌─────────────────────────▼──────────────────────────────┐  │
│  │  VPC: oficina-vpc (10.0.0.0/20)                        │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Cloud SQL for PostgreSQL 16                       │  │  │
│  │  │ Instance: oficina-db-instance                     │  │  │
│  │  │ Private IP: 10.109.0.3 | Backup: 03:00 UTC       │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────┐  ┌────────────────────────────────────┐  │
│  │ Cloud Function  │  │ Cloud Operations Suite              │  │
│  │ oficina-auth    │  │ • Cloud Monitoring (dashboards)    │  │
│  │ (Auth via CPF)  │  │ • Cloud Logging (JSON structured)  │  │
│  │ → Gera JWT      │  │ • Uptime Checks (healthcheck)     │  │
│  └────────────────┘  │ • Alerting (CPU, falhas)           │  │
│                       └────────────────────────────────────┘  │
│  ┌────────────────┐  ┌────────────────────────────────────┐  │
│  │ Secret Manager  │  │ Artifact Registry                  │  │
│  │ db-password     │  │ oficina-registry (Docker images)   │  │
│  │ db-connection   │  └────────────────────────────────────┘  │
│  └────────────────┘                                           │
│                       ┌────────────────────────────────────┐  │
│                       │ Terraform State                     │  │
│                       │ gs://oficina-terraform-state-fiap   │  │
│                       └────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                          GitHub                                │
│  ┌────────────────┐ ┌────────────────┐ ┌─────────────────┐   │
│  │oficina-auth-   │ │oficina-infra-  │ │oficina-infra-   │   │
│  │lambda          │ │k8s             │ │db               │   │
│  └───────┬────────┘ └───────┬────────┘ └───────┬─────────┘   │
│  ┌───────┴──────────────────┴──────────────────┴─────────┐   │
│  │            GitHub Actions (CI/CD)                       │   │
│  │  Build → Test → Docker Push → Deploy (auto on main)    │   │
│  └────────────────────────────────────────────────────────┘   │
│  ┌────────────────┐  Branch Protection: PR obrigatório       │
│  │oficina-app     │  Deploy: main → produção                 │
│  └────────────────┘                                           │
└───────────────────────────────────────────────────────────────┘
```
