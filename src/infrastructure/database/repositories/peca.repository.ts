import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPecaRepository } from '../../../domain/repositories/peca.repository.interface';
import { Peca } from '../../../domain/entities/peca.entity';
import { PecaOrmEntity } from '../entities/peca.orm-entity';
import { Money } from '../../../domain/value-objects/money.vo';

@Injectable()
export class PecaRepository implements IPecaRepository {
  constructor(
    @InjectRepository(PecaOrmEntity)
    private readonly repository: Repository<PecaOrmEntity>,
  ) {}

  async save(peca: Peca): Promise<Peca> {
    const entity = this.toOrmEntity(peca);
    const saved = await this.repository.save(entity);
    return this.toDomainEntity(saved);
  }

  async findById(id: string): Promise<Peca | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async findByCodigo(codigo: string): Promise<Peca | null> {
    const entity = await this.repository.findOne({ where: { codigo } });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async findAll(): Promise<Peca[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomainEntity(e));
  }

  async findAtivas(): Promise<Peca[]> {
    const entities = await this.repository.find({ where: { ativo: true } });
    return entities.map((e) => this.toDomainEntity(e));
  }

  async update(id: string, data: Partial<Peca>): Promise<Peca> {
    await this.repository.update(id, {
      quantidadeEstoque: data.quantidadeEstoque,
    });
    const updated = await this.repository.findOne({ where: { id } });
    return this.toDomainEntity(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toOrmEntity(domain: Peca): PecaOrmEntity {
    const entity = new PecaOrmEntity();
    entity.id = domain.id;
    entity.codigo = domain.codigo;
    entity.descricao = domain.descricao;
    entity.valor = domain.valor.value;
    entity.quantidadeEstoque = domain.quantidadeEstoque;
    entity.estoqueMinimo = domain.estoqueMinimo;
    entity.ativo = domain.ativo;
    return entity;
  }

  private toDomainEntity(orm: PecaOrmEntity): Peca {
    return new Peca(
      orm.id,
      orm.codigo,
      orm.descricao,
      new Money(orm.valor),
      orm.quantidadeEstoque,
      orm.estoqueMinimo,
      orm.ativo,
      orm.criadoEm,
      orm.atualizadoEm,
    );
  }
}
