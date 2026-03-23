import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { IPecaRepository, PECA_REPOSITORY } from '../../domain/repositories/peca.repository.interface';
import { Peca } from '../../domain/entities/peca.entity';

@Injectable()
export class UpdateEstoquePecaUseCase {
  constructor(
    @Inject(PECA_REPOSITORY)
    private readonly pecaRepository: IPecaRepository,
  ) {}

  async execute(id: string, quantidade: number): Promise<Peca> {
    const peca = await this.pecaRepository.findById(id);
    if (!peca) {
      throw new NotFoundException('Peça não encontrada');
    }

    try {
      const diferenca = quantidade - peca.quantidadeEstoque;

      if (diferenca > 0) {
        peca.adicionarEstoque(diferenca);
      } else if (diferenca < 0) {
        peca.removerEstoque(Math.abs(diferenca));
      }
      // Se diferenca === 0, nada muda
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return await this.pecaRepository.update(id, peca);
  }
}
