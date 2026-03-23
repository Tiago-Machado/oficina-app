import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ClienteOrmEntity } from './entities/cliente.orm-entity';
import { VeiculoOrmEntity } from './entities/veiculo.orm-entity';
import { ServicoOrmEntity } from './entities/servico.orm-entity';
import { PecaOrmEntity } from './entities/peca.orm-entity';
import { OrdemServicoOrmEntity } from './entities/ordem-servico.orm-entity';
import { UsuarioOrmEntity } from './entities/usuario.orm-entity';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'oficina'),
  password: configService.get('DB_PASSWORD', 'oficina123'),
  database: configService.get('DB_DATABASE', 'oficina_mecanica'),
  entities: [
    ClienteOrmEntity,
    VeiculoOrmEntity,
    ServicoOrmEntity,
    PecaOrmEntity,
    OrdemServicoOrmEntity,
    UsuarioOrmEntity,
  ],
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('NODE_ENV') === 'development',
});
