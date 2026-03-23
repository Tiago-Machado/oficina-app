import { OrdemServico } from '../entities/ordem-servico.entity';
import { StatusOS } from '../enums/status-os.enum';

export interface IOrdemServicoRepository {
  save(os: OrdemServico): Promise<OrdemServico>;
  findById(id: string): Promise<OrdemServico | null>;
  findAll(): Promise<OrdemServico[]>;
  findByStatus(status: StatusOS): Promise<OrdemServico[]>;
  findExcluindoFinalizadas(): Promise<OrdemServico[]>;
  update(id: string, os: Partial<OrdemServico>): Promise<OrdemServico>;
}

export const ORDEM_SERVICO_REPOSITORY = Symbol('IOrdemServicoRepository');
