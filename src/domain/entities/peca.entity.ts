import { Money } from '../value-objects/money.vo';

export class Peca {
  constructor(
    public readonly id: string,
    public codigo: string,
    public descricao: string,
    public valor: Money,
    public quantidadeEstoque: number,
    public estoqueMinimo: number = 0,
    public ativo: boolean = true,
    public readonly criadoEm: Date = new Date(),
    public atualizadoEm: Date = new Date(),
  ) {
    this.validarEstoque();
  }

  private validarEstoque(): void {
    if (this.quantidadeEstoque < 0) {
      throw new Error('Estoque não pode ser negativo');
    }
  }

  get estoqueAbaixoMinimo(): boolean {
    return this.quantidadeEstoque < this.estoqueMinimo;
  }

  adicionarEstoque(quantidade: number): void {
    if (quantidade <= 0) {
      throw new Error('Quantidade deve ser positiva');
    }
    this.quantidadeEstoque += quantidade;
    this.atualizadoEm = new Date();
  }

  removerEstoque(quantidade: number): void {
    if (quantidade <= 0) {
      throw new Error('Quantidade deve ser positiva');
    }
    if (this.quantidadeEstoque < quantidade) {
      throw new Error('Estoque insuficiente');
    }
    this.quantidadeEstoque -= quantidade;
    this.atualizadoEm = new Date();
  }

  atualizarValor(novoValor: Money): void {
    this.valor = novoValor;
    this.atualizadoEm = new Date();
  }

  static criar(
    id: string,
    codigo: string,
    descricao: string,
    valor: number,
    quantidadeEstoque: number,
    estoqueMinimo: number = 0,
  ): Peca {
    return new Peca(
      id,
      codigo,
      descricao,
      new Money(valor),
      quantidadeEstoque,
      estoqueMinimo,
    );
  }
}
