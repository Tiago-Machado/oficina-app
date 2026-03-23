import { Veiculo } from '../entities/veiculo.entity';

export interface IVeiculoRepository {
  save(veiculo: Veiculo): Promise<Veiculo>;
  findById(id: string): Promise<Veiculo | null>;
  findByPlaca(placa: string): Promise<Veiculo | null>;
  findAll(): Promise<Veiculo[]>;
  delete(id: string): Promise<void>;
}

export const VEICULO_REPOSITORY = Symbol('IVeiculoRepository');
