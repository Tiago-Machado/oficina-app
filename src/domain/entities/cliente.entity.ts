// src/domain/entities/cliente.entity.ts
import { CPF } from '../value-objects/cpf.vo';
import { Email } from '../value-objects/email.vo';

export class Cliente {
  constructor(
    public readonly id: string,
    public readonly cpfCnpj: CPF,
    public nome: string,
    public email: Email,
    public telefone: string,
    public endereco?: string,
    public readonly criadoEm: Date = new Date(),
    public atualizadoEm: Date = new Date(),
  ) {}

  atualizarDados(nome: string, email: Email, telefone: string, endereco?: string): void {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.endereco = endereco;
    this.atualizadoEm = new Date();
  }

  static criar(
    id: string,
    cpfCnpj: string,
    nome: string,
    email: string,
    telefone: string,
    endereco?: string,
  ): Cliente {
    return new Cliente(
      id,
      new CPF(cpfCnpj),
      nome,
      new Email(email),
      telefone,
      endereco,
    );
  }
}
