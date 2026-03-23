import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('usuarios')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  nome: string;

  @Column({ default: 'ATENDENTE' })
  role: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}
