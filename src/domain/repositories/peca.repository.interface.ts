import { Peca } from '../entities/peca.entity';

export interface IPecaRepository {
  save(peca: Peca): Promise<Peca>;
  findById(id: string): Promise<Peca | null>;
  findByCodigo(codigo: string): Promise<Peca | null>;
  findAll(): Promise<Peca[]>;
  findAtivas(): Promise<Peca[]>;
  update(id: string, peca: Partial<Peca>): Promise<Peca>;
  delete(id: string): Promise<void>;
}

export const PECA_REPOSITORY = Symbol('IPecaRepository');
