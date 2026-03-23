import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IClienteRepository, CLIENTE_REPOSITORY } from '../../domain/repositories/cliente.repository.interface';

@Injectable()
export class DeleteClienteUseCase {
  constructor(
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    await this.clienteRepository.delete(id);
  }
}
