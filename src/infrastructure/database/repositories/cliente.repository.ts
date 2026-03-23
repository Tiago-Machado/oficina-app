import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/entities/cliente.entity';
import { ClienteOrmEntity } from '../entities/cliente.orm-entity';
import { CPF } from '../../../domain/value-objects/cpf.vo';
import { Email } from '../../../domain/value-objects/email.vo';

@Injectable()
export class ClienteRepository implements IClienteRepository {
  constructor(
    @InjectRepository(ClienteOrmEntity)
    private readonly repository: Repository<ClienteOrmEntity>,
  ) {}

  async save(cliente: Cliente): Promise<Cliente> {
    const entity = this.toOrmEntity(cliente);
    const saved = await this.repository.save(entity);
    return this.toDomainEntity(saved);
  }

  async findById(id: string): Promise<Cliente | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<Cliente | null> {
    const entity = await this.repository.findOne({ where: { cpfCnpj } });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async findAll(): Promise<Cliente[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.toDomainEntity(e));
  }

  async update(id: string, data: Partial<Cliente>): Promise<Cliente> {
    await this.repository.update(id, {
      nome: data.nome,
      email: data.email?.value,
      telefone: data.telefone,
      endereco: data.endereco,
    });
    const updated = await this.repository.findOne({ where: { id } });
    return this.toDomainEntity(updated!);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toOrmEntity(domain: Cliente): ClienteOrmEntity {
    const entity = new ClienteOrmEntity();
    entity.id = domain.id;
    entity.cpfCnpj = domain.cpfCnpj.value;
    entity.nome = domain.nome;
    entity.email = domain.email.value;
    entity.telefone = domain.telefone;
    entity.endereco = domain.endereco;
    entity.criadoEm = domain.criadoEm;
    entity.atualizadoEm = domain.atualizadoEm;
    return entity;
  }

  private toDomainEntity(orm: ClienteOrmEntity): Cliente {
    return new Cliente(
      orm.id,
      new CPF(orm.cpfCnpj),
      orm.nome,
      new Email(orm.email),
      orm.telefone,
      orm.endereco,
      orm.criadoEm,
      orm.atualizadoEm,
    );
  }
}
