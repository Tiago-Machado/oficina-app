import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUsuarioRepository, Usuario } from '../../../domain/repositories/usuario.repository.interface';
import { UsuarioOrmEntity } from '../entities/usuario.orm-entity';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repository: Repository<UsuarioOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  async save(usuario: Usuario): Promise<Usuario> {
    const entity = this.repository.create({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      role: usuario.role,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  private toDomain(orm: UsuarioOrmEntity): Usuario {
    return {
      id: orm.id,
      nome: orm.nome,
      email: orm.email,
      senha: orm.senha,
      role: orm.role,
      criadoEm: orm.criadoEm,
    };
  }
}
