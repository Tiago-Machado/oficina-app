# ADR-002: Escolha do PostgreSQL como banco de dados

## Status
Aceito

## Contexto
O sistema precisa de um banco relacional para armazenar clientes, veículos, serviços, peças e ordens de serviço com integridade transacional.

## Decisão
Adotamos **PostgreSQL 16** via **Google Cloud SQL** (gerenciado).

## Justificativa
1. **ACID compliance** — integridade transacional para operações financeiras e de estoque
2. **JSONB nativo** — armazenamento flexível dos itens de serviço e peças na OS
3. **ENUM types** — representação nativa dos estados da OS
4. **Cloud SQL gerenciado** — backup automático, patches de segurança, alta disponibilidade
5. **Private IP** — banco não exposto à internet, comunicação via VPC
6. **Continuidade** — mesmo banco usado nas fases anteriores

## Alternativas Consideradas
- **MySQL** — menos recursos para JSONB e tipos customizados
- **MongoDB** — não adequado para integridade referencial entre entidades

## Consequências
- TypeORM com driver pg para comunicação
- Migrations gerenciadas via synchronize (dev) ou migrations manuais (prod)
- Backup diário às 03:00 UTC configurado no Terraform
