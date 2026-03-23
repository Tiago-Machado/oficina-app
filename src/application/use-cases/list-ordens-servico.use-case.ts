import { Injectable, Inject } from '@nestjs/common';
import { ORDEM_SERVICO_REPOSITORY, IOrdemServicoRepository } from '../../domain/repositories/ordem-servico.repository.interface';
import { OrdemServico } from '../../domain/entities/ordem-servico.entity';
import { ORDEM_PRIORIDADE_STATUS } from '../../domain/enums/status-os.enum';

@Injectable()
export class ListOrdensServicoUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY)
    private readonly osRepository: IOrdemServicoRepository,
  ) {}

  async execute(incluirFinalizadas: boolean = false): Promise<OrdemServico[]> {
    const ordens = incluirFinalizadas
      ? await this.osRepository.findAll()
      : await this.osRepository.findExcluindoFinalizadas();

    // Ordenar por prioridade de status (Fase 2)
    return ordens.sort((a, b) => {
      const prioA = ORDEM_PRIORIDADE_STATUS[a.status];
      const prioB = ORDEM_PRIORIDADE_STATUS[b.status];
      
      if (prioA !== prioB) {
        return prioA - prioB;
      }
      
      // Se mesma prioridade, mais antigas primeiro
      return a.criadoEm.getTime() - b.criadoEm.getTime();
    });
  }
}
