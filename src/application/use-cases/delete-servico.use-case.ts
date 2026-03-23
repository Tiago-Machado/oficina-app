import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IServicoRepository, SERVICO_REPOSITORY } from '../../domain/repositories/servico.repository.interface';

@Injectable()
export class DeleteServicoUseCase {
  constructor(
    @Inject(SERVICO_REPOSITORY)
    private readonly servicoRepository: IServicoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const servico = await this.servicoRepository.findById(id);
    if (!servico) {
      throw new NotFoundException('Serviço não encontrado');
    }
    // Soft delete — desativa ao invés de remover
    servico.desativar();
    await this.servicoRepository.save(servico);
  }
}
