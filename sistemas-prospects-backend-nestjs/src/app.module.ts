import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";
import { ProspectsModule } from "./prospects";


/* ============================================
   APP MODULE - Módulo raiz da aplicação
   ============================================ */
@Module({
  imports: [
    // ============================================
    // CONFIG - Carrega variáveis de ambiente
    // ============================================
    ConfigModule.forRoot({
      isGlobal: true, // Disponível em toda a aplicação
      envFilePath: ".env",
    }),

    // ============================================
    // TYPEORM - Conexão com MySQL
    // ============================================
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DB_HOST", "localhost"),
        port: configService.get<number>("DB_PORT", 3306),
        username: configService.get<string>("DB_USERNAME", "root"),
        password: configService.get<string>("DB_PASSWORD", ""),
        database: configService.get<string>("DB_DATABASE", "prospects_db"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true, // Auto-criar tabelas (apenas em dev!)
        logging: false,
      }),
    }),

    // ============================================
    // HTTP - Para requisições à API do GitHub
    // ============================================
    HttpModule,

    // ============================================
    // MÓDULOS DA APLICAÇÃO
    // ============================================
    ProspectsModule,
  ],
})
export class AppModule {}
