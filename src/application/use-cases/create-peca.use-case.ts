import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IPecaRepository, PECA_REPOSITORY } from '../../domain/repositories/peca.repository.interface';
import { Peca } from '../../domain/entities/peca.entity';
import { v4 as uuid } from 'uuid';

export interface CreatePecaInput {
  codigo: string;
  descricao: string;
  valor: number;
  quantidadeEstoque: number;
  estoqueMinimo: number;
}

@Injectable()
export class CreatePecaUseCase {
  constructor(
    @Inject(PECA_REPOSITORY)
    private readonly pecaRepository: IPecaRepository,
  ) {}

  async execute(input: CreatePecaInput): Promise<Peca> {
    const exists = await this.pecaRepository.findByCodigo(input.codigo);
    if (exists) {
      throw new ConflictException('Peça com este código já existe');
    }

    const peca = Peca.criar(
      uuid(),
      input.codigo,
      input.descricao,
      input.valor,
      input.quantidadeEstoque,
      input.estoqueMinimo,
    );

    return await this.pecaRepository.save(peca);
  }
}
