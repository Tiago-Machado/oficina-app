import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PecaOrmEntity } from '../../infrastructure/database/entities/peca.orm-entity';
import { PecaRepository } from '../../infrastructure/database/repositories/peca.repository';
import { PECA_REPOSITORY } from '../../domain/repositories/peca.repository.interface';
import { CreatePecaUseCase } from '../../application/use-cases/create-peca.use-case';
import { ListPecasUseCase } from '../../application/use-cases/list-pecas.use-case';
import { UpdatePecaUseCase } from '../../application/use-cases/update-peca.use-case';
import { UpdateEstoquePecaUseCase } from '../../application/use-cases/update-estoque-peca.use-case';
import { DeletePecaUseCase } from '../../application/use-cases/delete-peca.use-case';
import { PecaController } from '../controllers/peca.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PecaOrmEntity])],
  controllers: [PecaController],
  providers: [
    {
      provide: PECA_REPOSITORY,
      useClass: PecaRepository,
    },
    CreatePecaUseCase,
    ListPecasUseCase,
    UpdatePecaUseCase,
    UpdateEstoquePecaUseCase,
    DeletePecaUseCase,
  ],
})
export class PecaModule {}
