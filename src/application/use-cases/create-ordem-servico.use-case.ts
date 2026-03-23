import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { ORDEM_SERVICO_REPOSITORY, IOrdemServicoRepository } from '../../domain/repositories/ordem-servico.repository.interface';
import { VEICULO_REPOSITORY, IVeiculoRepository } from '../../domain/repositories/veiculo.repository.interface';
import { CLIENTE_REPOSITORY, IClienteRepository } from '../../domain/repositories/cliente.repository.interface';
import { OrdemServico } from '../../domain/entities/ordem-servico.entity';
import { v4 as uuid } from 'uuid';

export interface CreateOrdemServicoInput {
  clienteId: string;
  veiculoId: string;
  servicos: any[];
  pecas: any[];
  observacoes?: string;
}

@Injectable()
export class CreateOrdemServicoUseCase {
  constructor(
    @Inject(ORDEM_SERVICO_REPOSITORY)
    private readonly osRepository: IOrdemServicoRepository,
    @Inject(VEICULO_REPOSITORY)
    private readonly veiculoRepository: IVeiculoRepository,
    @Inject(CLIENTE_REPOSITORY)
    private readonly clienteRepository: IClienteRepository,
  ) {}

  async execute(input: CreateOrdemServicoInput): Promise<OrdemServico> {
    // 1. Validar se cliente existe
    const cliente = await this.clienteRepository.findById(input.clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    // 2. Validar se veículo existe
    const veiculo = await this.veiculoRepository.findById(input.veiculoId);
    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }

    // 3. CRÍTICO: Validar se o veículo pertence ao cliente
    if (veiculo.clienteId !== input.clienteId) {
      throw new BadRequestException(
        `O veículo ${veiculo.placa.formatada} não pertence ao cliente ${cliente.nome}`
      );
    }

    // 4. Criar OS
    const os = OrdemServico.criar(
      uuid(),
      input.clienteId,
      input.veiculoId,
      input.servicos,
      input.pecas,
      input.observacoes,
    );

    return await this.osRepository.save(os);
  }
}
