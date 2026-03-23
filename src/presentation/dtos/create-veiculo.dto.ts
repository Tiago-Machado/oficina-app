import { IsString, IsNotEmpty, IsNumber, IsUUID, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVeiculoDto {
  @ApiProperty({ example: 'ABC1234' })
  @IsString()
  @IsNotEmpty()
  placa: string;

  @ApiProperty({ example: 'uuid-do-cliente' })
  @IsUUID()
  @IsNotEmpty()
  clienteId: string;

  @ApiProperty({ example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  marca: string;

  @ApiProperty({ example: 'Corolla' })
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty({ example: 2020 })
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  ano: number;

  @ApiProperty({ example: 'Prata', required: false })
  @IsString()
  @IsOptional()
  cor?: string;
}
