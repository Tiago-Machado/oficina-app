// src/domain/enums/status-os.enum.ts
export enum StatusOS {
  RECEBIDA = 'RECEBIDA',
  DIAGNOSTICO = 'DIAGNOSTICO',
  AGUARDANDO_APROVACAO = 'AGUARDANDO_APROVACAO',
  EM_EXECUCAO = 'EM_EXECUCAO',
  FINALIZADA = 'FINALIZADA',
  ENTREGUE = 'ENTREGUE',
}

// Ordem de prioridade para listagem (Fase 2)
export const ORDEM_PRIORIDADE_STATUS: Record<StatusOS, number> = {
  [StatusOS.EM_EXECUCAO]: 1,
  [StatusOS.AGUARDANDO_APROVACAO]: 2,
  [StatusOS.DIAGNOSTICO]: 3,
  [StatusOS.RECEBIDA]: 4,
  [StatusOS.FINALIZADA]: 5,
  [StatusOS.ENTREGUE]: 6,
};

// Transições válidas de status
export const TRANSICOES_VALIDAS: Record<StatusOS, StatusOS[]> = {
  [StatusOS.RECEBIDA]: [StatusOS.DIAGNOSTICO],
  [StatusOS.DIAGNOSTICO]: [StatusOS.AGUARDANDO_APROVACAO, StatusOS.EM_EXECUCAO],
  [StatusOS.AGUARDANDO_APROVACAO]: [StatusOS.EM_EXECUCAO, StatusOS.RECEBIDA],
  [StatusOS.EM_EXECUCAO]: [StatusOS.FINALIZADA],
  [StatusOS.FINALIZADA]: [StatusOS.ENTREGUE],
  [StatusOS.ENTREGUE]: [],
};
