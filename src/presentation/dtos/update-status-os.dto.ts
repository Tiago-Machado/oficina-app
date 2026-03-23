import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusOS } from '../../domain/enums/status-os.enum';

export class UpdateStatusOsDto {
  @ApiProperty({ 
    enum: StatusOS,
    example: StatusOS.EM_EXECUCAO
  })
  @IsEnum(StatusOS)
  status: StatusOS;
}
