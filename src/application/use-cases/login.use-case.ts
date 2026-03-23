import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsuarioRepository, USUARIO_REPOSITORY } from '../../domain/repositories/usuario.repository.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, senha: string): Promise<{ access_token: string }> {
    const usuario = await this.usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      email: usuario.email,
      sub: usuario.id,
      role: usuario.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
