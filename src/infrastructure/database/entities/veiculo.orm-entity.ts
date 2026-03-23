import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ClienteOrmEntity } from './cliente.orm-entity';

@Entity('veiculos')
export class VeiculoOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  placa: string;

  @Column({ name: 'cliente_id' })
  clienteId: string;

  @ManyToOne(() => ClienteOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cliente_id' })
  cliente?: ClienteOrmEntity;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  ano: number;

  @Column({ nullable: true })
  cor?: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
