# RFC-001: Estratégia de Autenticação via CPF com Cloud Function

## Resumo
Proposta de implementação de autenticação serverless para clientes da oficina via CPF, utilizando Google Cloud Functions para geração de tokens JWT.

## Motivação
A oficina precisa permitir que clientes acompanhem suas ordens de serviço de forma segura. A autenticação via CPF é simples para o cliente e permite identificação unívoca.

## Proposta

### Fluxo de Autenticação

```
1. Cliente envia POST /auth com { "cpf": "12345678900" }
2. API Gateway roteia para Cloud Function
3. Cloud Function:
   a. Valida formato do CPF (dígitos verificadores)
   b. Consulta tabela 'clientes' no Cloud SQL
   c. Se encontrado, gera JWT com claims: sub, cpf, nome, role=CLIENTE
   d. Retorna { access_token, expires_in: 86400 }
4. Cliente usa token nas requisições subsequentes via header Authorization: Bearer <token>
```

### Dois Fluxos de Autenticação

| Fluxo | Público | Método | Uso |
|-------|---------|--------|-----|
| Auth Cliente | Cloud Function | CPF → JWT | Consulta de status da OS |
| Auth Admin | API NestJS | Email/Senha → JWT | Gestão completa do sistema |

### Segurança
- JWT expira em 24 horas
- Cloud Function acessa banco via Private IP (sem exposição)
- Validação algorítmica do CPF (não apenas comprimento)
- Logs estruturados para auditoria

## Alternativas Descartadas
- **OAuth2/OpenID Connect** — complexidade desnecessária para o MVP
- **API Key** — não identifica o cliente individualmente
- **Firebase Auth** — adiciona dependência desnecessária

## Impacto
- Novo repositório: oficina-auth-lambda
- API Gateway precisa rotear /auth para a Cloud Function
- Endpoints de consulta pública de OS validam token de cliente
