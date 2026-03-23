# ADR-003: Estratégia de Auto-Scaling com HPA

## Status
Aceito

## Contexto
Com múltiplas unidades da oficina e aumento na base de clientes, o sistema precisa escalar automaticamente para manter performance e disponibilidade.

## Decisão
Adotamos **Horizontal Pod Autoscaler (HPA)** no GKE com métricas de CPU e memória.

## Configuração
- **Min replicas:** 2 (alta disponibilidade)
- **Max replicas:** 10 (limite de custo)
- **CPU target:** 70% de utilização
- **Memória target:** 80% de utilização

## Justificativa
1. **Alta disponibilidade** — mínimo de 2 pods garante continuidade em caso de falha
2. **Custo controlado** — máximo de 10 pods evita gastos descontrolados
3. **Resposta automática** — escala sem intervenção manual em picos de demanda
4. **Métricas integradas** — GKE fornece métricas de CPU/memória nativamente

## Consequências
- Deployment configurado com resource requests e limits
- Monitoring deve alertar quando HPA atinge max replicas
- Nodes do GKE também escalam (1-3 nodes via cluster autoscaler)
