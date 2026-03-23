import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IServicoRepository } from '../../../domain/repositories/servico.repository.interface';
import { Servico } from '../../../domain/entities/servico.entity';
import { ServicoOrmEntity } from '../entities/servico.orm-entity';
import { Money } from '../../../domain/value-objects/money.vo';

@Injectable()
export class ServicoRepository implements IServicoRepository {
  constructor(
    @InjectRepository(ServicoOrmEntity)
    private readonly repository: Repository<ServicoOrmEntity>,
  ) {}

  async save(servico: Servico): Promise<Servico> {
    const entity = this.toOrmEntity(servico);
    const saved = await this.repository.save(entity);
    return this.toDomainEntity(saved);
  }

  async findById(id: string): Promise<Servico | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async findAll(): Promise<Servico[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomainEntity(e));
  }

  async findAtivos(): Promise<Servico[]> {
    const entities = await this.repository.find({ where: { ativo: true } });
    return entities.map((e) => this.toDomainEntity(e));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toOrmEntity(domain: Servico): ServicoOrmEntity {
    const entity = new ServicoOrmEntity();
    entity.id = domain.id;
    entity.descricao = domain.descricao;
    entity.valor = domain.valor.value;
    entity.tempoEstimadoMinutos = domain.tempoEstimadoMinutos;
    entity.ativo = domain.ativo;
    return entity;
  }

  private toDomainEntity(orm: ServicoOrmEntity): Servico {
    return new Servico(
      orm.id,
      orm.descricao,
      new Money(orm.valor),
      orm.tempoEstimadoMinutos,
      orm.ativo,
      orm.criadoEm,
      orm.atualizadoEm,
    );
  }
}
