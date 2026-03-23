import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IClienteRepository, CLIENTE_REPOSITORY } from '../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../domain/entities/cliente.entity';

@Injectable()
export class GetClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }
}
