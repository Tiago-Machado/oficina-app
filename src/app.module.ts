import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './infrastructure/database/typeorm.config';
import { HealthController } from './presentation/controllers/health.controller';
import { ClienteModule } from './presentation/modules/cliente.module';
import { VeiculoModule } from './presentation/modules/veiculo.module';
import { ServicoModule } from './presentation/modules/servico.module';
import { PecaModule } from './presentation/modules/peca.module';
import { OrdemServicoModule } from './presentation/modules/ordem-servico.module';
import { AuthModule } from './presentation/modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),
    ClienteModule,
    VeiculoModule,
    ServicoModule,
    PecaModule,
    OrdemServicoModule,
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
