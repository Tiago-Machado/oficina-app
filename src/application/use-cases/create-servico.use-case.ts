import { Injectable, Inject } from '@nestjs/common';
import { IServicoRepository, SERVICO_REPOSITORY } from '../../domain/repositories/servico.repository.interface';
import { Servico } from '../../domain/entities/servico.entity';
import { v4 as uuid } from 'uuid';

export interface CreateServicoInput {
  descricao: string;
  valor: number;
  tempoEstimadoMinutos: number;
}

@Injectable()
export class CreateServicoUseCase {
  constructor(
    @Inject(SERVICO_REPOSITORY)
    private readonly servicoRepository: IServicoRepository,
  ) {}

  async execute(input: CreateServicoInput): Promise<Servico> {
    const servico = Servico.criar(
      uuid(),
      input.descricao,
      input.valor,
      input.tempoEstimadoMinutos,
    );

    return await this.servicoRepository.save(servico);
  }
}
