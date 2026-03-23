import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ORDEM_SERVICO_REPOSITORY, IOrdemServicoRepository } from '../../domain/repositories/ordem-servico.repository.interface';
import { OrdemServico } from '../../domain/entities/ordem-servico.entity';

@Injectable()
export class GetOrdemServicoUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY)
    private readonly osRepository: IOrdemServicoRepository,
  ) {}

  async execute(id: string): Promise<OrdemServico> {
    const os = await this.osRepository.findById(id);
    if (!os) {
      throw new NotFoundException('Ordem de serviço não encontrada');
    }
    return os;
  }
}
