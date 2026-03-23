// src/domain/value-objects/email.vo.ts
export class Email {
  private readonly valor: string;

  constructor(email: string) {
    if (!this.validar(email)) {
      throw new Error('Email inválido');
    }
    this.valor = email.toLowerCase().trim();
  }

  get value(): string {
    return this.valor;
  }

  private validar(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  equals(other: Email): boolean {
    return this.valor === other.valor;
  }
}
