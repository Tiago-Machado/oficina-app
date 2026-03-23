import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { IOrdemServicoRepository } from '../../../domain/repositories/ordem-servico.repository.interface';
import { OrdemServico } from '../../../domain/entities/ordem-servico.entity';
import { OrdemServicoOrmEntity } from '../entities/ordem-servico.orm-entity';
import { StatusOS } from '../../../domain/enums/status-os.enum';

@Injectable()
export class OrdemServicoRepository implements IOrdemServicoRepository {
  constructor(
    @InjectRepository(OrdemServicoOrmEntity)
    private readonly repository: Repository<OrdemServicoOrmEntity>,
  ) {}

  async save(os: OrdemServico): Promise<OrdemServico> {
    const entity = this.toOrmEntity(os);
    const saved = await this.repository.save(entity);
    return this.toDomainEntity(saved);
  }

  async findById(id: string): Promise<OrdemServico | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async findAll(): Promise<OrdemServico[]> {
    const entities = await this.repository.find({ order: { criadoEm: 'ASC' } });
    return entities.map((e) => this.toDomainEntity(e));
  }

  async findByStatus(status: StatusOS): Promise<OrdemServico[]> {
    const entities = await this.repository.find({ 
      where: { status },
      order: { criadoEm: 'ASC' }
    });
    return entities.map((e) => this.toDomainEntity(e));
  }

  async findExcluindoFinalizadas(): Promise<OrdemServico[]> {
    const entities = await this.repository.find({
      where: {
        status: Not(In([StatusOS.FINALIZADA, StatusOS.ENTREGUE])),
      },
      order: { criadoEm: 'ASC' },
    });
    return entities.map((e) => this.toDomainEntity(e));
  }

  async update(id: string, data: Partial<OrdemServico>): Promise<OrdemServico> {
    await this.repository.update(id, {
      status: data.status,
      orcamentoAprovado: data.orcamentoAprovado,
    });
    const updated = await this.repository.findOne({ where: { id } });
    return this.toDomainEntity(updated!);
  }

  private toOrmEntity(domain: OrdemServico): OrdemServicoOrmEntity {
    const entity = new OrdemServicoOrmEntity();
    entity.id = domain.id;
    entity.clienteId = domain.clienteId;
    entity.veiculoId = domain.veiculoId;
    entity.status = domain.status;
    entity.servicos = domain.servicos;
    entity.pecas = domain.pecas;
    entity.observacoes = domain.observacoes;
    entity.orcamentoAprovado = domain.orcamentoAprovado;
    entity.criadoEm = domain.criadoEm;
    entity.atualizadoEm = domain.atualizadoEm;
    return entity;
  }

  private toDomainEntity(orm: OrdemServicoOrmEntity): OrdemServico {
    return new OrdemServico(
      orm.id,
      orm.clienteId,
      orm.veiculoId,
      orm.status,
      orm.servicos,
      orm.pecas,
      orm.observacoes,
      orm.orcamentoAprovado,
      orm.criadoEm,
      orm.atualizadoEm,
    );
  }
}
