import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEstoquePecaDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  quantidade: number;
}
