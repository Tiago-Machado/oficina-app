import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { CreateOrdemServicoDto } from '../dtos/create-ordem-servico.dto';
import { UpdateStatusOsDto } from '../dtos/update-status-os.dto';
import { CreateOrdemServicoUseCase } from '../../application/use-cases/create-ordem-servico.use-case';
import { ListOrdensServicoUseCase } from '../../application/use-cases/list-ordens-servico.use-case';
import { GetOrdemServicoUseCase } from '../../application/use-cases/get-ordem-servico.use-case';
import { UpdateStatusOsUseCase } from '../../application/use-cases/update-status-os.use-case';
import { AprovarOrcamentoOsUseCase } from '../../application/use-cases/aprovar-orcamento-os.use-case';

@ApiTags('Ordens de Serviço')
@Controller('ordens-servico')
export class OrdemServicoController {
  constructor(
    private readonly createOrdemServicoUseCase: CreateOrdemServicoUseCase,
    private readonly listOrdensServicoUseCase: ListOrdensServicoUseCase,
    private readonly getOrdemServicoUseCase: GetOrdemServicoUseCase,
    private readonly updateStatusOsUseCase: UpdateStatusOsUseCase,
    private readonly aprovarOrcamentoOsUseCase: AprovarOrcamentoOsUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar nova ordem de serviço',
    description: 'Cria uma OS com status RECEBIDA e gera orçamento automático',
  })
  @ApiResponse({ status: 201, description: 'OS criada com sucesso' })
  async create(@Body() createDto: CreateOrdemServicoDto) {
    const os = await this.createOrdemServicoUseCase.execute(createDto);
    return {
      id: os.id,
      clienteId: os.clienteId,
      veiculoId: os.veiculoId,
      status: os.status,
      valorTotal: os.valorTotal.formatted,
      orcamentoAprovado: os.orcamentoAprovado,
      servicos: os.servicos,
      pecas: os.pecas,
      observacoes: os.observacoes,
      criadoEm: os.criadoEm,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar ordens de serviço',
    description: 'Lista OS ordenadas por prioridade. Exclui FINALIZADA e ENTREGUE por padrão.',
  })
  @ApiQuery({ name: 'incluirFinalizadas', required: false, type: Boolean })
  async findAll(@Query('incluirFinalizadas') incluirFinalizadas?: string) {
    const incluir = incluirFinalizadas === 'true';
    const ordens = await this.listOrdensServicoUseCase.execute(incluir);

    return ordens.map((os) => ({
      id: os.id,
      clienteId: os.clienteId,
      veiculoId: os.veiculoId,
      status: os.status,
      valorTotal: os.valorTotal.formatted,
      orcamentoAprovado: os.orcamentoAprovado,
      criadoEm: os.criadoEm,
    }));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar ordem de serviço por ID' })
  @ApiResponse({ status: 404, description: 'OS não encontrada' })
  async findOne(@Param('id') id: string) {
    const os = await this.getOrdemServicoUseCase.execute(id);
    return {
      id: os.id,
      clienteId: os.clienteId,
      veiculoId: os.veiculoId,
      status: os.status,
      valorTotal: os.valorTotal.formatted,
      orcamentoAprovado: os.orcamentoAprovado,
      servicos: os.servicos,
      pecas: os.pecas,
      observacoes: os.observacoes,
      criadoEm: os.criadoEm,
      atualizadoEm: os.atualizadoEm,
    };
  }

  @Get(':id/status')
  @ApiOperation({
    summary: 'Consultar status da ordem de serviço (público)',
    description: 'Endpoint público para consulta de status pelo cliente',
  })
  async getStatus(@Param('id') id: string) {
    const os = await this.getOrdemServicoUseCase.execute(id);
    return {
      id: os.id,
      status: os.status,
      atualizadoEm: os.atualizadoEm,
    };
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar status da ordem de serviço',
    description: 'Atualiza o status seguindo as transições válidas',
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusOsDto,
  ) {
    const os = await this.updateStatusOsUseCase.execute(id, updateStatusDto.status);
    return {
      id: os.id,
      status: os.status,
      atualizadoEm: os.atualizadoEm,
    };
  }

  @Patch(':id/aprovar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Aprovar orçamento da ordem de serviço',
    description: 'Aprova o orçamento e muda status para EM_EXECUCAO',
  })
  @ApiResponse({ status: 200, description: 'Orçamento aprovado' })
  @ApiResponse({ status: 400, description: 'OS não está aguardando aprovação' })
  async aprovarOrcamento(@Param('id') id: string) {
    const os = await this.aprovarOrcamentoOsUseCase.execute(id);
    return {
      id: os.id,
      orcamentoAprovado: os.orcamentoAprovado,
      status: os.status,
      atualizadoEm: os.atualizadoEm,
    };
  }
}
