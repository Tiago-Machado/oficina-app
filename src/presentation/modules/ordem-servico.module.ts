import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdemServicoOrmEntity } from '../../infrastructure/database/entities/ordem-servico.orm-entity';
import { OrdemServicoRepository } from '../../infrastructure/database/repositories/ordem-servico.repository';
import { ORDEM_SERVICO_REPOSITORY } from '../../domain/repositories/ordem-servico.repository.interface';
import { CreateOrdemServicoUseCase } from '../../application/use-cases/create-ordem-servico.use-case';
import { ListOrdensServicoUseCase } from '../../application/use-cases/list-ordens-servico.use-case';
import { GetOrdemServicoUseCase } from '../../application/use-cases/get-ordem-servico.use-case';
import { UpdateStatusOsUseCase } from '../../application/use-cases/update-status-os.use-case';
import { AprovarOrcamentoOsUseCase } from '../../application/use-cases/aprovar-orcamento-os.use-case';
import { OrdemServicoController } from '../controllers/ordem-servico.controller';
import { ClienteModule } from './cliente.module';
import { VeiculoModule } from './veiculo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdemServicoOrmEntity]),
    ClienteModule,
    VeiculoModule,
  ],
  controllers: [OrdemServicoController],
  providers: [
    {
      provide: ORDEM_SERVICO_REPOSITORY,
      useClass: OrdemServicoRepository,
    },
    CreateOrdemServicoUseCase,
    ListOrdensServicoUseCase,
    GetOrdemServicoUseCase,
    UpdateStatusOsUseCase,
    AprovarOrcamentoOsUseCase,
  ],
})
export class OrdemServicoModule {}
