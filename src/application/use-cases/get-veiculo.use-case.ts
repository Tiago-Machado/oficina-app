import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IVeiculoRepository, VEICULO_REPOSITORY } from '../../domain/repositories/veiculo.repository.interface';
import { Veiculo } from '../../domain/entities/veiculo.entity';

@Injectable()
export class GetVeiculoUseCase {
  constructor(
    @Inject(VEICULO_REPOSITORY)
    private readonly veiculoRepository: IVeiculoRepository,
  ) {}

  async execute(id: string): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findById(id);
    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }
    return veiculo;
  }
}
