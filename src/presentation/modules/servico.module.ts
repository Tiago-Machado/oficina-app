import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoOrmEntity } from '../../infrastructure/database/entities/servico.orm-entity';
import { ServicoRepository } from '../../infrastructure/database/repositories/servico.repository';
import { SERVICO_REPOSITORY } from '../../domain/repositories/servico.repository.interface';
import { CreateServicoUseCase } from '../../application/use-cases/create-servico.use-case';
import { ListServicosUseCase } from '../../application/use-cases/list-servicos.use-case';
import { UpdateServicoUseCase } from '../../application/use-cases/update-servico.use-case';
import { DeleteServicoUseCase } from '../../application/use-cases/delete-servico.use-case';
import { ServicoController } from '../controllers/servico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServicoOrmEntity])],
  controllers: [ServicoController],
  providers: [
    {
      provide: SERVICO_REPOSITORY,
      useClass: ServicoRepository,
    },
    CreateServicoUseCase,
    ListServicosUseCase,
    UpdateServicoUseCase,
    DeleteServicoUseCase,
  ],
})
export class ServicoModule {}
