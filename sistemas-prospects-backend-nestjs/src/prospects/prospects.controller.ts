import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ProspectsService } from "./services/prospects.service";
import { CreateProspectDto, UpdateProspectDto } from "./dto";
import { Prospect } from "./entities/prospect.entity";

/* ============================================
   CONTROLLER - Endpoints REST para Prospects
   Base URL: /api/prospects
   ============================================ */
@Controller("prospects")
export class ProspectsController {
  constructor(private readonly prospectsService: ProspectsService) {}

  /* ============================================
     POST /api/prospects
     Cria um novo prospect a partir do username GitHub
     ============================================ */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProspectDto: CreateProspectDto
  ): Promise<Prospect> {
    return this.prospectsService.create(createProspectDto);
  }

  /* ============================================
     GET /api/prospects
     Lista todos os prospects ou busca por termo
     Query params: ?search=termo
     ============================================ */
  @Get()
  async findAll(@Query("search") search?: string): Promise<Prospect[]> {
    if (search) {
      return this.prospectsService.search(search);
    }
    return this.prospectsService.findAll();
  }

  /* ============================================
     GET /api/prospects/:id
     Busca um prospect específico por ID
     ============================================ */
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Prospect> {
    return this.prospectsService.findOne(id);
  }

  /* ============================================
     PUT /api/prospects/:id
     Atualiza os dados de um prospect
     ============================================ */
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProspectDto: UpdateProspectDto
  ): Promise<Prospect> {
    return this.prospectsService.update(id, updateProspectDto);
  }

  /* ============================================
     POST /api/prospects/:id/refresh
     Atualiza os dados do GitHub de um prospect
     ============================================ */
  @Post(":id/refresh")
  async refresh(@Param("id", ParseIntPipe) id: number): Promise<Prospect> {
    return this.prospectsService.refresh(id);
  }

  /* ============================================
     DELETE /api/prospects/:id
     Remove um prospect do sistema
     ============================================ */
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.prospectsService.remove(id);
  }
}
