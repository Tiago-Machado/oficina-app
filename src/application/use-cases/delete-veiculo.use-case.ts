import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IVeiculoRepository, VEICULO_REPOSITORY } from '../../domain/repositories/veiculo.repository.interface';

@Injectable()
export class DeleteVeiculoUseCase {
  constructor(
    @Inject(VEICULO_REPOSITORY)
    private readonly veiculoRepository: IVeiculoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const veiculo = await this.veiculoRepository.findById(id);
    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }
    await this.veiculoRepository.delete(id);
  }
}
