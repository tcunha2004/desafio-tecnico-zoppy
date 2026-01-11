import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";
import { ProspectsController } from "./prospects.controller";
import { ProspectsService } from "./services/prospects.service";
import { GithubService } from "./services/github.service";
import { Prospect } from "./entities/prospect.entity";

/* ============================================
   MÓDULO - Prospects
   Agrupa todos os componentes relacionados a prospects
   ============================================ */
@Module({
  imports: [
    // Registra a entidade Prospect para uso com TypeORM
    TypeOrmModule.forFeature([Prospect]),
    // Módulo HTTP para requisições à API do GitHub
    HttpModule,
  ],
  controllers: [ProspectsController],
  providers: [ProspectsService, GithubService],
  exports: [ProspectsService], // Exporta o service para uso em outros módulos
})
export class ProspectsModule {}
