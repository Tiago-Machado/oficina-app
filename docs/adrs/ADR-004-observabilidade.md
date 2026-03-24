# ADR-004: Escolha do Google Cloud Operations Suite para Observabilidade

## Status
Aceito

## Contexto
O sistema precisa de monitoramento, logging, alertas e dashboards. O enunciado permite escolha livre entre ferramentas como Datadog, New Relic ou similar.

## Decisão
Adotamos o **Google Cloud Operations Suite** (nativo do GCP) como solução completa de observabilidade, sem dependência de ferramentas externas.

## Justificativa

1. **Integração nativa com GKE** — métricas de CPU, memória, pods e nodes são coletadas automaticamente sem necessidade de agentes adicionais
2. **Cloud Monitoring** — dashboards customizados com métricas de infraestrutura e métricas baseadas em logs (volume de OS, erros)
3. **Cloud Logging** — coleta automática de logs dos containers com suporte a JSON estruturado e filtros avançados
4. **Uptime Checks** — verificação de saúde da API a cada 5 minutos com alertas automáticos
5. **Alerting** — políticas de alerta baseadas em métricas (CPU > 80%) com notificação
6. **Custo zero adicional** — incluído nos créditos educacionais FIAP, sem licença extra
7. **Consistência** — toda a stack em um único provedor, sem fragmentação de ferramentas
8. **Alinhamento com certificação GCP** — demonstra domínio do ecossistema nativo

## Componentes Utilizados

| Componente | Função | Configuração |
|---|---|---|
| Cloud Monitoring | Dashboards e métricas | CPU, memória, request count, DB connections |
| Cloud Logging | Logs estruturados JSON | Winston → stdout → Cloud Logging automático |
| Uptime Checks | Health monitoring | GET /api/v1/health a cada 5 min |
| Alerting | Notificação de incidentes | CPU > 80% por 2 min |
| Log-based Metrics | Métricas de negócio | Volume de OS criadas, contagem de erros |

## Métricas Monitoradas

### Infraestrutura
- CPU utilization dos pods (kubernetes.io/container/cpu/core_usage_time)
- Memory usage dos pods (kubernetes.io/container/memory/used_bytes)
- Database connections (cloudsql.googleapis.com/database/network/connections)

### Aplicação
- Volume diário de ordens de serviço (log-based metric: os_criadas)
- Erros e falhas (log-based metric: app_errors)
- Latência via logs estruturados com timestamps

### Negócio
- Tempo médio por status da OS (calculado via timestamps nos logs de transição)
- Fluxo: RECEBIDA → DIAGNOSTICO → AGUARDANDO_APROVACAO → EM_EXECUCAO → FINALIZADA → ENTREGUE

## Alternativas Descartadas
- **Datadog** — excelente APM mas requer licença paga após trial de 14 dias
- **New Relic** — free tier de 100GB/mês mas adiciona complexidade com agente externo
- **Prometheus + Grafana** — poderoso mas requer manutenção própria do stack

## Consequências
- Logs da aplicação devem ser em formato JSON (implementado via Winston)
- Métricas customizadas de negócio criadas via log-based metrics
- Dashboards e alertas gerenciados via console GCP ou Terraform
