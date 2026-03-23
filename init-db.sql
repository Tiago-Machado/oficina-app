CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    senha VARCHAR NOT NULL,
    nome VARCHAR NOT NULL,
    role VARCHAR DEFAULT 'ATENDENTE',
    criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY,
    cpf_cnpj VARCHAR UNIQUE NOT NULL,
    nome VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    telefone VARCHAR NOT NULL,
    endereco VARCHAR,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS veiculos (
    id UUID PRIMARY KEY,
    placa VARCHAR NOT NULL,
    cliente_id UUID REFERENCES clientes(id),
    marca VARCHAR NOT NULL,
    modelo VARCHAR NOT NULL,
    ano INTEGER NOT NULL,
    cor VARCHAR,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS servicos (
    id UUID PRIMARY KEY,
    descricao VARCHAR NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    tempo_estimado_minutos INTEGER NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pecas (
    id UUID PRIMARY KEY,
    codigo VARCHAR UNIQUE NOT NULL,
    descricao VARCHAR NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    estoque_minimo INTEGER NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ordens_servico (
    id UUID PRIMARY KEY,
    cliente_id UUID REFERENCES clientes(id),
    veiculo_id UUID REFERENCES veiculos(id),
    status VARCHAR NOT NULL,
    servicos JSONB,
    pecas JSONB,
    observacoes TEXT,
    orcamento_aprovado BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW()
);
