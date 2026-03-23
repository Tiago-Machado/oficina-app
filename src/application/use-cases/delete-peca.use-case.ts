import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IPecaRepository, PECA_REPOSITORY } from '../../domain/repositories/peca.repository.interface';

@Injectable()
export class DeletePecaUseCase {
  constructor(
    @Inject(PECA_REPOSITORY)
    private readonly pecaRepository: IPecaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const peca = await this.pecaRepository.findById(id);
    if (!peca) {
      throw new NotFoundException('Peça não encontrada');
    }
    await this.pecaRepository.delete(id);
  }
}
