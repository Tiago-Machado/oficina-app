import { IsString, IsNotEmpty, IsUUID, IsArray, IsOptional, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ItemServicoDto {
  @ApiProperty({ example: 'uuid-do-servico' })
  @IsUUID()
  servicoId: string;

  @ApiProperty({ example: 'Troca de óleo' })
  @IsString()
  descricao: string;

  @ApiProperty({ example: 150.00 })
  @IsNumber()
  @Min(0)
  valor: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  quantidade: number;
}

class ItemPecaDto {
  @ApiProperty({ example: 'uuid-da-peca' })
  @IsUUID()
  pecaId: string;

  @ApiProperty({ example: 'Filtro de óleo' })
  @IsString()
  descricao: string;

  @ApiProperty({ example: 45.90 })
  @IsNumber()
  @Min(0)
  valor: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantidade: number;
}

export class CreateOrdemServicoDto {
  @ApiProperty({ example: 'uuid-do-cliente' })
  @IsUUID()
  @IsNotEmpty()
  clienteId: string;

  @ApiProperty({ example: 'uuid-do-veiculo' })
  @IsUUID()
  @IsNotEmpty()
  veiculoId: string;

  @ApiProperty({ type: [ItemServicoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemServicoDto)
  servicos: ItemServicoDto[];

  @ApiProperty({ type: [ItemPecaDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemPecaDto)
  pecas: ItemPecaDto[];

  @ApiProperty({ example: 'Cliente reclamou de barulho no motor', required: false })
  @IsString()
  @IsOptional()
  observacoes?: string;
}
