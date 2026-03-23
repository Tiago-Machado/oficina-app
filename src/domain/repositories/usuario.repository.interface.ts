export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: string;
  criadoEm: Date;
}

export interface IUsuarioRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  save(usuario: Usuario): Promise<Usuario>;
}

export const USUARIO_REPOSITORY = Symbol('IUsuarioRepository');
