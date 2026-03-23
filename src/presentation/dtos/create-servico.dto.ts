import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoDto {
  @ApiProperty({ example: 'Troca de óleo' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 150.00 })
  @IsNumber()
  @Min(0)
  valor: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  @Min(1)
  tempoEstimadoMinutos: number;
}
