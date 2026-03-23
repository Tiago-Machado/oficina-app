import { Injectable, Inject } from '@nestjs/common';
import { IServicoRepository, SERVICO_REPOSITORY } from '../../domain/repositories/servico.repository.interface';
import { Servico } from '../../domain/entities/servico.entity';

@Injectable()
export class ListServicosUseCase {
  constructor(
    @Inject(SERVICO_REPOSITORY)
    private readonly servicoRepository: IServicoRepository,
  ) {}

  async execute(): Promise<Servico[]> {
    return await this.servicoRepository.findAtivos();
  }
}
