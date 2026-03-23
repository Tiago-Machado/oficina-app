import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePecaDto {
  @ApiProperty({ example: 'PEC001' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Filtro de óleo' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 45.90 })
  @IsNumber()
  @Min(0)
  valor: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  quantidadeEstoque: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  estoqueMinimo: number;
}
