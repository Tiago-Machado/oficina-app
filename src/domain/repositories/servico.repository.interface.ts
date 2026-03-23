import { Servico } from '../entities/servico.entity';

export interface IServicoRepository {
  save(servico: Servico): Promise<Servico>;
  findById(id: string): Promise<Servico | null>;
  findAll(): Promise<Servico[]>;
  findAtivos(): Promise<Servico[]>;
  delete(id: string): Promise<void>;
}

export const SERVICO_REPOSITORY = Symbol('IServicoRepository');
