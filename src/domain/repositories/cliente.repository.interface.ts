import { Cliente } from '../entities/cliente.entity';

export interface IClienteRepository {
  save(cliente: Cliente): Promise<Cliente>;
  findById(id: string): Promise<Cliente | null>;
  findByCpfCnpj(cpfCnpj: string): Promise<Cliente | null>;
  findAll(): Promise<Cliente[]>;
  update(id: string, cliente: Partial<Cliente>): Promise<Cliente>;
  delete(id: string): Promise<void>;
}

export const CLIENTE_REPOSITORY = Symbol('IClienteRepository');
