import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IVeiculoRepository } from '../../../domain/repositories/veiculo.repository.interface';
import { Veiculo } from '../../../domain/entities/veiculo.entity';
import { VeiculoOrmEntity } from '../entities/veiculo.orm-entity';
import { Placa } from '../../../domain/value-objects/placa.vo';

@Injectable()
export class VeiculoRepository implements IVeiculoRepository {
  constructor(
    @InjectRepository(VeiculoOrmEntity)
    private readonly repository: Repository<VeiculoOrmEntity>,
  ) {}

  async save(veiculo: Veiculo): Promise<Veiculo> {
    const entity = this.toOrmEntity(veiculo);
    const saved = await this.repository.save(entity);
    return this.toDomainEntity(saved);
  }

  async findById(id: string): Promise<Veiculo | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async findByPlaca(placa: string): Promise<Veiculo | null> {
    const entity = await this.repository.findOne({ where: { placa } });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async findAll(): Promise<Veiculo[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomainEntity(e));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toOrmEntity(domain: Veiculo): VeiculoOrmEntity {
    const entity = new VeiculoOrmEntity();
    entity.id = domain.id;
    entity.placa = domain.placa.value;
    entity.clienteId = domain.clienteId;
    entity.marca = domain.marca;
    entity.modelo = domain.modelo;
    entity.ano = domain.ano;
    entity.cor = domain.cor;
    return entity;
  }

  private toDomainEntity(orm: VeiculoOrmEntity): Veiculo {
    return new Veiculo(
      orm.id,
      new Placa(orm.placa),
      orm.clienteId,
      orm.marca,
      orm.modelo,
      orm.ano,
      orm.cor,
      orm.criadoEm,
      orm.atualizadoEm,
    );
  }
}
