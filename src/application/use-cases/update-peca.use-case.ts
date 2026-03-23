import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IPecaRepository, PECA_REPOSITORY } from '../../domain/repositories/peca.repository.interface';
import { Peca } from '../../domain/entities/peca.entity';
import { Money } from '../../domain/value-objects/money.vo';

export interface UpdatePecaInput {
  descricao?: string;
  valor?: number;
  estoqueMinimo?: number;
}

@Injectable()
export class UpdatePecaUseCase {
  constructor(
    @Inject(PECA_REPOSITORY)
    private readonly pecaRepository: IPecaRepository,
  ) {}

  async execute(id: string, input: UpdatePecaInput): Promise<Peca> {
    const peca = await this.pecaRepository.findById(id);
    if (!peca) {
      throw new NotFoundException('Peça não encontrada');
    }

    if (input.descricao !== undefined) peca.descricao = input.descricao;
    if (input.valor !== undefined) peca.atualizarValor(new Money(input.valor));
    if (input.estoqueMinimo !== undefined) peca.estoqueMinimo = input.estoqueMinimo;
    peca.atualizadoEm = new Date();

    return await this.pecaRepository.save(peca);
  }
}
