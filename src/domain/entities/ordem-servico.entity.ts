import { StatusOS, TRANSICOES_VALIDAS } from '../enums/status-os.enum';
import { Money } from '../value-objects/money.vo';

export interface ItemServico {
  servicoId: string;
  descricao: string;
  valor: number;
  quantidade: number;
}

export interface ItemPeca {
  pecaId: string;
  descricao: string;
  valor: number;
  quantidade: number;
}

export class OrdemServico {
  constructor(
    public readonly id: string,
    public readonly clienteId: string,
    public readonly veiculoId: string,
    public status: StatusOS,
    public servicos: ItemServico[],
    public pecas: ItemPeca[],
    public observacoes?: string,
    public orcamentoAprovado: boolean = false,
    public readonly criadoEm: Date = new Date(),
    public atualizadoEm: Date = new Date(),
  ) {}

  get valorTotal(): Money {
    const totalServicos = this.servicos.reduce(
      (acc, item) => acc + (item.valor * item.quantidade),
      0,
    );

    const totalPecas = this.pecas.reduce(
      (acc, item) => acc + (item.valor * item.quantidade),
      0,
    );

    return new Money(totalServicos + totalPecas);
  }

  atualizarStatus(novoStatus: StatusOS): void {
    const transicoes = TRANSICOES_VALIDAS[this.status];

    if (!transicoes.includes(novoStatus)) {
      throw new Error(
        `Transição inválida: não é possível ir de ${this.status} para ${novoStatus}. ` +
        `Transições permitidas: ${transicoes.join(', ') || 'nenhuma (status final)'}`,
      );
    }

    this.status = novoStatus;
    this.atualizadoEm = new Date();
  }

  aprovarOrcamento(): void {
    if (this.status !== StatusOS.AGUARDANDO_APROVACAO) {
      throw new Error('Ordem de serviço não está aguardando aprovação');
    }
    this.orcamentoAprovado = true;
    this.status = StatusOS.EM_EXECUCAO;
    this.atualizadoEm = new Date();
  }

  adicionarServico(item: ItemServico): void {
    this.servicos.push(item);
    this.atualizadoEm = new Date();
  }

  adicionarPeca(item: ItemPeca): void {
    this.pecas.push(item);
    this.atualizadoEm = new Date();
  }

  static criar(
    id: string,
    clienteId: string,
    veiculoId: string,
    servicos: ItemServico[],
    pecas: ItemPeca[],
    observacoes?: string,
  ): OrdemServico {
    return new OrdemServico(
      id,
      clienteId,
      veiculoId,
      StatusOS.RECEBIDA,
      servicos,
      pecas,
      observacoes,
    );
  }
}
