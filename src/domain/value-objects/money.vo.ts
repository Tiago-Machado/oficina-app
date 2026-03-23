// src/domain/value-objects/money.vo.ts
export class Money {
  private readonly valor: number;

  constructor(valor: number) {
    if (valor < 0) {
      throw new Error('Valor monetário não pode ser negativo');
    }
    // Arredonda para 2 casas decimais
    this.valor = Math.round(valor * 100) / 100;
  }

  get value(): number {
    return this.valor;
  }

  get formatted(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.valor);
  }

  add(other: Money): Money {
    return new Money(this.valor + other.valor);
  }

  subtract(other: Money): Money {
    return new Money(this.valor - other.valor);
  }

  multiply(factor: number): Money {
    return new Money(this.valor * factor);
  }

  equals(other: Money): boolean {
    return this.valor === other.valor;
  }

  isGreaterThan(other: Money): boolean {
    return this.valor > other.valor;
  }

  isLessThan(other: Money): boolean {
    return this.valor < other.valor;
  }
}
