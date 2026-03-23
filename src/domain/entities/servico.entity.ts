import { Money } from '../value-objects/money.vo';

export class Servico {
  constructor(
    public readonly id: string,
    public descricao: string,
    public valor: Money,
    public tempoEstimadoMinutos: number,
    public ativo: boolean = true,
    public readonly criadoEm: Date = new Date(),
    public atualizadoEm: Date = new Date(),
  ) {}

  atualizarValor(novoValor: Money): void {
    this.valor = novoValor;
    this.atualizadoEm = new Date();
  }

  desativar(): void {
    this.ativo = false;
    this.atualizadoEm = new Date();
  }

  ativar(): void {
    this.ativo = true;
    this.atualizadoEm = new Date();
  }

  static criar(
    id: string,
    descricao: string,
    valor: number,
    tempoEstimadoMinutos: number,
  ): Servico {
    return new Servico(
      id,
      descricao,
      new Money(valor),
      tempoEstimadoMinutos,
    );
  }
}
