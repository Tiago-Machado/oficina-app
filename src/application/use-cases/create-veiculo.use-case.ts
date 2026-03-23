import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IVeiculoRepository, VEICULO_REPOSITORY } from '../../domain/repositories/veiculo.repository.interface';
import { Veiculo } from '../../domain/entities/veiculo.entity';
import { v4 as uuid } from 'uuid';

export interface CreateVeiculoInput {
  placa: string;
  clienteId: string;
  marca: string;
  modelo: string;
  ano: number;
  cor?: string;
}

@Injectable()
export class CreateVeiculoUseCase {
  constructor(
    @Inject(VEICULO_REPOSITORY)
    private readonly veiculoRepository: IVeiculoRepository,
  ) {}

  async execute(input: CreateVeiculoInput): Promise<Veiculo> {
    const exists = await this.veiculoRepository.findByPlaca(input.placa);
    if (exists) {
      throw new ConflictException('Veículo com esta placa já existe');
    }

    const veiculo = Veiculo.criar(
      uuid(),
      input.placa,
      input.clienteId,
      input.marca,
      input.modelo,
      input.ano,
      input.cor,
    );

    return await this.veiculoRepository.save(veiculo);
  }
}
