import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ORDEM_SERVICO_REPOSITORY, IOrdemServicoRepository } from '../../domain/repositories/ordem-servico.repository.interface';
import { OrdemServico } from '../../domain/entities/ordem-servico.entity';
import { StatusOS } from '../../domain/enums/status-os.enum';

@Injectable()
export class UpdateStatusOsUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY)
    private readonly osRepository: IOrdemServicoRepository,
  ) {}

  async execute(id: string, novoStatus: StatusOS): Promise<OrdemServico> {
    const os = await this.osRepository.findById(id);
    if (!os) {
      throw new NotFoundException('Ordem de serviço não encontrada');
    }

    try {
      os.atualizarStatus(novoStatus);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return await this.osRepository.update(id, os);
  }
}
