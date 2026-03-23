import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { StatusOS } from '../../../domain/enums/status-os.enum';
import { ClienteOrmEntity } from './cliente.orm-entity';
import { VeiculoOrmEntity } from './veiculo.orm-entity';

@Entity('ordens_servico')
export class OrdemServicoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cliente_id' })
  clienteId: string;

  @ManyToOne(() => ClienteOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cliente_id' })
  cliente?: ClienteOrmEntity;

  @Column({ name: 'veiculo_id' })
  veiculoId: string;

  @ManyToOne(() => VeiculoOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'veiculo_id' })
  veiculo?: VeiculoOrmEntity;

  @Column({
    type: 'enum',
    enum: StatusOS,
    default: StatusOS.RECEBIDA,
  })
  status: StatusOS;

  @Column('jsonb')
  servicos: any[];

  @Column('jsonb')
  pecas: any[];

  @Column({ nullable: true, type: 'text' })
  observacoes?: string;

  @Column({ name: 'orcamento_aprovado', default: false })
  orcamentoAprovado: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
