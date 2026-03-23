import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { CreateVeiculoDto } from '../dtos/create-veiculo.dto';
import { UpdateVeiculoDto } from '../dtos/update-veiculo.dto';
import { CreateVeiculoUseCase } from '../../application/use-cases/create-veiculo.use-case';
import { ListVeiculosUseCase } from '../../application/use-cases/list-veiculos.use-case';
import { GetVeiculoUseCase } from '../../application/use-cases/get-veiculo.use-case';
import { UpdateVeiculoUseCase } from '../../application/use-cases/update-veiculo.use-case';
import { DeleteVeiculoUseCase } from '../../application/use-cases/delete-veiculo.use-case';

@ApiTags('Veículos')
@Controller('veiculos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VeiculoController {
  constructor(
    private readonly createVeiculoUseCase: CreateVeiculoUseCase,
    private readonly listVeiculosUseCase: ListVeiculosUseCase,
    private readonly getVeiculoUseCase: GetVeiculoUseCase,
    private readonly updateVeiculoUseCase: UpdateVeiculoUseCase,
    private readonly deleteVeiculoUseCase: DeleteVeiculoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo veículo' })
  @ApiResponse({ status: 201, description: 'Veículo criado' })
  @ApiResponse({ status: 409, description: 'Placa já cadastrada' })
  async create(@Body() createDto: CreateVeiculoDto) {
    const veiculo = await this.createVeiculoUseCase.execute(createDto);
    return {
      id: veiculo.id,
      placa: veiculo.placa.formatada,
      clienteId: veiculo.clienteId,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      cor: veiculo.cor,
      criadoEm: veiculo.criadoEm,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos' })
  async findAll() {
    const veiculos = await this.listVeiculosUseCase.execute();
    return veiculos.map((v) => ({
      id: v.id,
      placa: v.placa.formatada,
      clienteId: v.clienteId,
      marca: v.marca,
      modelo: v.modelo,
      ano: v.ano,
      cor: v.cor,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar veículo por ID' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  async findOne(@Param('id') id: string) {
    const veiculo = await this.getVeiculoUseCase.execute(id);
    return {
      id: veiculo.id,
      placa: veiculo.placa.formatada,
      clienteId: veiculo.clienteId,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      cor: veiculo.cor,
      criadoEm: veiculo.criadoEm,
      atualizadoEm: veiculo.atualizadoEm,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar veículo' })
  @ApiResponse({ status: 200, description: 'Veículo atualizado' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateVeiculoDto) {
    const veiculo = await this.updateVeiculoUseCase.execute(id, updateDto);
    return {
      id: veiculo.id,
      placa: veiculo.placa.formatada,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      cor: veiculo.cor,
      atualizadoEm: veiculo.atualizadoEm,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar veículo' })
  @ApiResponse({ status: 204, description: 'Veículo deletado' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  async remove(@Param('id') id: string) {
    await this.deleteVeiculoUseCase.execute(id);
  }
}
