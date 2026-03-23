import { Injectable, Inject } from '@nestjs/common';
import { IClienteRepository, CLIENTE_REPOSITORY } from '../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../domain/entities/cliente.entity';

@Injectable()
export class ListClientesUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(): Promise<Cliente[]> {
    return await this.clienteRepository.findAll();
  }
}
