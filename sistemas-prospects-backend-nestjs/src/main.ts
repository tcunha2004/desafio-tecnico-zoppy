import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

/* ============================================
   BOOTSTRAP - Inicialização da aplicação NestJS
   ============================================ */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ============================================
  // CORS - Permite requisições do frontend Angular
  // ============================================
  app.enableCors({
    origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });

  // ============================================
  // VALIDAÇÃO GLOBAL - Valida DTOs automaticamente
  // ============================================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não declaradas no DTO
      forbidNonWhitelisted: true, // Retorna erro se houver props extras
      transform: true, // Transforma tipos automaticamente
    })
  );

  // ============================================
  // PREFIXO GLOBAL - Todas as rotas começam com /api
  // ============================================
  app.setGlobalPrefix("api");

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Backend rodando em: http://localhost:${port}/api`);
  console.log(`📋 Endpoints disponíveis:`);
  console.log(`   GET    /api/prospects       - Listar todos os prospects`);
  console.log(`   GET    /api/prospects/:id   - Buscar prospect por ID`);
  console.log(`   POST   /api/prospects       - Criar novo prospect`);
  console.log(`   PUT    /api/prospects/:id   - Atualizar prospect`);
  console.log(`   DELETE /api/prospects/:id   - Remover prospect`);
}

bootstrap();
