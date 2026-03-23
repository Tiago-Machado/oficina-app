# Diagrama de Sequência — Fluxo de Autenticação

```
┌────────┐     ┌─────────────┐     ┌────────────────┐     ┌──────────┐
│Cliente  │     │API Gateway   │     │Cloud Function   │     │Cloud SQL │
│(Browser)│     │              │     │(oficina-auth)   │     │PostgreSQL│
└───┬────┘     └──────┬──────┘     └───────┬────────┘     └────┬─────┘
    │                  │                     │                   │
    │ POST /auth       │                     │                   │
    │ {"cpf":"529..."}│                     │                   │
    │─────────────────►│                     │                   │
    │                  │                     │                   │
    │                  │ Forward request     │                   │
    │                  │────────────────────►│                   │
    │                  │                     │                   │
    │                  │                     │ 1. Validar CPF    │
    │                  │                     │ (dígitos verif.)  │
    │                  │                     │                   │
    │                  │                     │ SELECT cliente    │
    │                  │                     │ WHERE cpf=$1      │
    │                  │                     │──────────────────►│
    │                  │                     │                   │
    │                  │                     │ {id,nome,email}   │
    │                  │                     │◄──────────────────│
    │                  │                     │                   │
    │                  │                     │ 2. Gerar JWT      │
    │                  │                     │ {sub,cpf,role}    │
    │                  │                     │                   │
    │                  │ {access_token}      │                   │
    │                  │◄────────────────────│                   │
    │                  │                     │                   │
    │ 200 OK           │                     │                   │
    │ {access_token,   │                     │                   │
    │  expires_in}     │                     │                   │
    │◄─────────────────│                     │                   │
    │                  │                     │                   │
```

# Diagrama de Sequência — Abertura de Ordem de Serviço

```
┌────────┐     ┌─────────────┐     ┌──────────┐     ┌──────────┐
│Atendente│     │API Gateway   │     │GKE       │     │Cloud SQL │
│(Admin)  │     │              │     │oficina-app│    │PostgreSQL│
└───┬────┘     └──────┬──────┘     └────┬─────┘     └────┬─────┘
    │                  │                  │                 │
    │ POST /api/v1/    │                  │                 │
    │ ordens-servico   │                  │                 │
    │ Auth: Bearer JWT │                  │                 │
    │─────────────────►│                  │                 │
    │                  │                  │                 │
    │                  │ Forward + JWT    │                 │
    │                  │─────────────────►│                 │
    │                  │                  │                 │
    │                  │                  │ 1. Validar JWT  │
    │                  │                  │ (JwtAuthGuard)  │
    │                  │                  │                 │
    │                  │                  │ 2. Validar      │
    │                  │                  │ cliente existe   │
    │                  │                  │────────────────►│
    │                  │                  │◄────────────────│
    │                  │                  │                 │
    │                  │                  │ 3. Validar      │
    │                  │                  │ veículo existe   │
    │                  │                  │ e pertence ao   │
    │                  │                  │ cliente          │
    │                  │                  │────────────────►│
    │                  │                  │◄────────────────│
    │                  │                  │                 │
    │                  │                  │ 4. Criar OS     │
    │                  │                  │ status=RECEBIDA │
    │                  │                  │ calc. orçamento │
    │                  │                  │────────────────►│
    │                  │                  │◄────────────────│
    │                  │                  │                 │
    │                  │ 201 Created      │                 │
    │                  │◄─────────────────│                 │
    │ {id, status,     │                  │                 │
    │  valorTotal...}  │                  │                 │
    │◄─────────────────│                  │                 │
```
