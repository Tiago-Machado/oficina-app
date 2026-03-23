import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IClienteRepository, CLIENTE_REPOSITORY } from '../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../domain/entities/cliente.entity';
import { v4 as uuid } from 'uuid';

export interface CreateClienteInput {
  cpfCnpj: string;
  nome: string;
  email: string;
  telefone: string;
  endereco?: string;
}

@Injectable()
export class CreateClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(input: CreateClienteInput): Promise<Cliente> {
    // Verificar se já existe
    const exists = await this.clienteRepository.findByCpfCnpj(input.cpfCnpj);
    if (exists) {
      throw new ConflictException('Cliente com este CPF/CNPJ já existe');
    }

    // Criar entidade de domínio
    const cliente = Cliente.criar(
      uuid(),
      input.cpfCnpj,
      input.nome,
      input.email,
      input.telefone,
      input.endereco,
    );

    // Salvar
    return await this.clienteRepository.save(cliente);
  }
}
