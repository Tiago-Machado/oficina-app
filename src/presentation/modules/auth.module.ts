import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioOrmEntity } from '../../infrastructure/database/entities/usuario.orm-entity';
import { UsuarioRepository } from '../../infrastructure/database/repositories/usuario.repository';
import { USUARIO_REPOSITORY } from '../../domain/repositories/usuario.repository.interface';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioOrmEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'oficina-secret-key'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioRepository,
    },
    LoginUseCase,
    RegisterUseCase,
    JwtStrategy,
  ],
  exports: [JwtStrategy, USUARIO_REPOSITORY],
})
export class AuthModule {}
