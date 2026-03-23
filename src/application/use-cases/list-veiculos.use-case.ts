import { Injectable, Inject } from '@nestjs/common';
import { IVeiculoRepository, VEICULO_REPOSITORY } from '../../domain/repositories/veiculo.repository.interface';
import { Veiculo } from '../../domain/entities/veiculo.entity';

@Injectable()
export class ListVeiculosUseCase {
  constructor(
    @Inject(VEICULO_REPOSITORY)
    private readonly veiculoRepository: IVeiculoRepository,
  ) {}

  async execute(): Promise<Veiculo[]> {
    return await this.veiculoRepository.findAll();
  }
}
