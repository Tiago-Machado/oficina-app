import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IClienteRepository, CLIENTE_REPOSITORY } from '../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../domain/entities/cliente.entity';
import { Email } from '../../domain/value-objects/email.vo';

export interface UpdateClienteInput {
  nome?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
}

@Injectable()
export class UpdateClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(id: string, input: UpdateClienteInput): Promise<Cliente> {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    cliente.atualizarDados(
      input.nome ?? cliente.nome,
      input.email ? new Email(input.email) : cliente.email,
      input.telefone ?? cliente.telefone,
      input.endereco ?? cliente.endereco,
    );

    return await this.clienteRepository.update(id, cliente);
  }
}
