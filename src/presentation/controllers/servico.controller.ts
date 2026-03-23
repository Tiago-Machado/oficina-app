import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { CreateServicoDto } from '../dtos/create-servico.dto';
import { UpdateServicoDto } from '../dtos/update-servico.dto';
import { CreateServicoUseCase } from '../../application/use-cases/create-servico.use-case';
import { ListServicosUseCase } from '../../application/use-cases/list-servicos.use-case';
import { UpdateServicoUseCase } from '../../application/use-cases/update-servico.use-case';
import { DeleteServicoUseCase } from '../../application/use-cases/delete-servico.use-case';

@ApiTags('Serviços')
@Controller('servicos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ServicoController {
  constructor(
    private readonly createServicoUseCase: CreateServicoUseCase,
    private readonly listServicosUseCase: ListServicosUseCase,
    private readonly updateServicoUseCase: UpdateServicoUseCase,
    private readonly deleteServicoUseCase: DeleteServicoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo serviço' })
  @ApiResponse({ status: 201, description: 'Serviço criado' })
  async create(@Body() createDto: CreateServicoDto) {
    const servico = await this.createServicoUseCase.execute(createDto);
    return {
      id: servico.id,
      descricao: servico.descricao,
      valor: servico.valor.formatted,
      tempoEstimadoMinutos: servico.tempoEstimadoMinutos,
      ativo: servico.ativo,
      criadoEm: servico.criadoEm,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar serviços ativos' })
  async findAll() {
    const servicos = await this.listServicosUseCase.execute();
    return servicos.map((s) => ({
      id: s.id,
      descricao: s.descricao,
      valor: s.valor.formatted,
      tempoEstimadoMinutos: s.tempoEstimadoMinutos,
    }));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar serviço' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateServicoDto) {
    const servico = await this.updateServicoUseCase.execute(id, updateDto);
    return {
      id: servico.id,
      descricao: servico.descricao,
      valor: servico.valor.formatted,
      tempoEstimadoMinutos: servico.tempoEstimadoMinutos,
      ativo: servico.ativo,
      atualizadoEm: servico.atualizadoEm,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Desativar serviço (soft delete)' })
  @ApiResponse({ status: 204, description: 'Serviço desativado' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async remove(@Param('id') id: string) {
    await this.deleteServicoUseCase.execute(id);
  }
}
