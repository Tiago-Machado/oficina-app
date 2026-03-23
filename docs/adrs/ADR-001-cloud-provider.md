# ADR-001: Escolha do Google Cloud Platform como provedor de nuvem

## Status
Aceito

## Contexto
O sistema de oficina mecânica precisa ser elevado a operação corporativa com cloud, segurança e observabilidade. A escolha do provedor de nuvem impacta custos, serviços disponíveis e curva de aprendizado.

## Decisão
Adotamos **Google Cloud Platform (GCP)** como provedor de nuvem.

## Justificativa
1. **Créditos educacionais FIAP** — custo zero para o projeto
2. **GKE** — considerado o melhor Kubernetes gerenciado do mercado, com integração nativa ao ecossistema Google
3. **Cloud SQL** — PostgreSQL gerenciado com backup automático e Private IP
4. **Cloud Functions 2nd gen** — serverless com suporte a Node.js 20
5. **Cloud Operations Suite** — monitoramento, logging e tracing nativos integrados ao GKE
6. **Alinhamento com certificação** — preparação para Professional GCP

## Alternativas Consideradas
- **AWS** — mais popular mas sem créditos educacionais disponíveis
- **Azure** — menos expressivo em Kubernetes gerenciado

## Consequências
- Toda infraestrutura provisionada com Terraform usando google provider
- CI/CD usa gcloud CLI e google-github-actions
- Monitoramento nativo via Cloud Monitoring + Cloud Logging
