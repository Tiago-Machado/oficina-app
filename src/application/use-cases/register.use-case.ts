import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IUsuarioRepository, USUARIO_REPOSITORY, Usuario } from '../../domain/repositories/usuario.repository.interface';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(nome: string, email: string, senha: string): Promise<Usuario> {
    const exists = await this.usuarioRepository.findByEmail(email);

    if (exists) {
      throw new ConflictException('Email já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario: Usuario = {
      id: uuid(),
      nome,
      email,
      senha: senhaHash,
      role: 'ATENDENTE',
      criadoEm: new Date(),
    };

    return await this.usuarioRepository.save(usuario);
  }
}
