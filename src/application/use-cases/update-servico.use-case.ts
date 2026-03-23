import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IServicoRepository, SERVICO_REPOSITORY } from '../../domain/repositories/servico.repository.interface';
import { Servico } from '../../domain/entities/servico.entity';
import { Money } from '../../domain/value-objects/money.vo';

export interface UpdateServicoInput {
  descricao?: string;
  valor?: number;
  tempoEstimadoMinutos?: number;
}

@Injectable()
export class UpdateServicoUseCase {
  constructor(
    @Inject(SERVICO_REPOSITORY)
    private readonly servicoRepository: IServicoRepository,
  ) {}

  async execute(id: string, input: UpdateServicoInput): Promise<Servico> {
    const servico = await this.servicoRepository.findById(id);
    if (!servico) {
      throw new NotFoundException('Serviço não encontrado');
    }

    if (input.descricao !== undefined) servico.descricao = input.descricao;
    if (input.valor !== undefined) servico.atualizarValor(new Money(input.valor));
    if (input.tempoEstimadoMinutos !== undefined) servico.tempoEstimadoMinutos = input.tempoEstimadoMinutos;
    servico.atualizadoEm = new Date();

    return await this.servicoRepository.save(servico);
  }
}
