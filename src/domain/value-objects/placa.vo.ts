// src/domain/value-objects/placa.vo.ts
export class Placa {
  private readonly valor: string;

  constructor(placa: string) {
    const limpa = placa.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    
    if (!this.validar(limpa)) {
      throw new Error('Placa inválida');
    }
    
    this.valor = limpa;
  }

  get value(): string {
    return this.valor;
  }

  get formatada(): string {
    // Formato: ABC-1234 ou ABC1D23 (Mercosul)
    if (this.isMercosul()) {
      return this.valor.replace(/([A-Z]{3})(\d)([A-Z])(\d{2})/, '$1-$2$3$4');
    } else {
      return this.valor.replace(/([A-Z]{3})(\d{4})/, '$1-$2');
    }
  }

  private validar(placa: string): boolean {
    // Formato antigo: AAA9999
    const formatoAntigo = /^[A-Z]{3}\d{4}$/;
    // Formato Mercosul: AAA9A99
    const formatoMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    
    return formatoAntigo.test(placa) || formatoMercosul.test(placa);
  }

  private isMercosul(): boolean {
    return /^[A-Z]{3}\d[A-Z]\d{2}$/.test(this.valor);
  }

  equals(other: Placa): boolean {
    return this.valor === other.valor;
  }
}
