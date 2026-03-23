import { Injectable, Inject } from '@nestjs/common';
import { IPecaRepository, PECA_REPOSITORY } from '../../domain/repositories/peca.repository.interface';
import { Peca } from '../../domain/entities/peca.entity';

@Injectable()
export class ListPecasUseCase {
  constructor(
    @Inject(PECA_REPOSITORY)
    private readonly pecaRepository: IPecaRepository,
  ) {}

  async execute(): Promise<Peca[]> {
    return await this.pecaRepository.findAtivas();
  }
}
