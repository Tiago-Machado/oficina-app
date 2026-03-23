import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ORDEM_SERVICO_REPOSITORY, IOrdemServicoRepository } from '../../domain/repositories/ordem-servico.repository.interface';
import { OrdemServico } from '../../domain/entities/ordem-servico.entity';

@Injectable()
export class AprovarOrcamentoOsUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY)
    private readonly osRepository: IOrdemServicoRepository,
  ) {}

  async execute(id: string): Promise<OrdemServico> {
    const os = await this.osRepository.findById(id);
    if (!os) {
      throw new Error('Ordem de serviço não encontrada');
    }

    try {
      os.aprovarOrcamento();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    
    return await this.osRepository.update(id, os);
  }
}
