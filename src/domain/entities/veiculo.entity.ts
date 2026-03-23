// src/domain/entities/veiculo.entity.ts
import { Placa } from '../value-objects/placa.vo';

export class Veiculo {
  constructor(
    public readonly id: string,
    public readonly placa: Placa,
    public readonly clienteId: string,
    public marca: string,
    public modelo: string,
    public ano: number,
    public cor?: string,
    public readonly criadoEm: Date = new Date(),
    public atualizadoEm: Date = new Date(),
  ) {
    this.validarAno(ano);
  }

  private validarAno(ano: number): void {
    const anoAtual = new Date().getFullYear();
    const anoMinimo = 1900;
    
    if (ano < anoMinimo || ano > anoAtual + 1) {
      throw new Error(`Ano do veículo inválido. Deve estar entre ${anoMinimo} e ${anoAtual + 1}`);
    }
  }

  atualizarDados(marca: string, modelo: string, ano: number, cor?: string): void {
    this.validarAno(ano);
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.cor = cor;
    this.atualizadoEm = new Date();
  }

  static criar(
    id: string,
    placa: string,
    clienteId: string,
    marca: string,
    modelo: string,
    ano: number,
    cor?: string,
  ): Veiculo {
    return new Veiculo(
      id,
      new Placa(placa),
      clienteId,
      marca,
      modelo,
      ano,
      cor,
    );
  }
}
