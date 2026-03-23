import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsCpfCnpj } from '../validators/cpf-cnpj.validator';

export class CreateClienteDto {
  @ApiProperty({ 
    example: '12345678900',
    description: 'CPF (11 dígitos) ou CNPJ (14 dígitos)'
  })
  @IsString()
  @IsNotEmpty()
  @IsCpfCnpj({ message: 'CPF ou CNPJ inválido' })
  cpfCnpj: string;

  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'joao@exemplo.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '11987654321' })
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ApiProperty({ example: 'Rua Exemplo, 123', required: false })
  @IsString()
  @IsOptional()
  endereco?: string;
}
