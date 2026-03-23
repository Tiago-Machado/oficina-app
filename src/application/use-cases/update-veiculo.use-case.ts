import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IVeiculoRepository, VEICULO_REPOSITORY } from '../../domain/repositories/veiculo.repository.interface';
import { Veiculo } from '../../domain/entities/veiculo.entity';

export interface UpdateVeiculoInput {
  marca?: string;
  modelo?: string;
  ano?: number;
  cor?: string;
}

@Injectable()
export class UpdateVeiculoUseCase {
  constructor(
    @Inject(VEICULO_REPOSITORY)
    private readonly veiculoRepository: IVeiculoRepository,
  ) {}

  async execute(id: string, input: UpdateVeiculoInput): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findById(id);
    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }

    veiculo.atualizarDados(
      input.marca ?? veiculo.marca,
      input.modelo ?? veiculo.modelo,
      input.ano ?? veiculo.ano,
      input.cor ?? veiculo.cor,
    );

    return await this.veiculoRepository.save(veiculo);
  }
}
