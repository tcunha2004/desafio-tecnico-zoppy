import { IsString, IsOptional, IsEmail } from "class-validator";

/* ============================================
   DTO - Atualizar Prospect
   Permite atualizar campos específicos manualmente
   ============================================ */
export class UpdateProspectDto {
  @IsOptional()
  @IsString({ message: "Nome deve ser uma string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "Bio deve ser uma string" })
  bio?: string;

  @IsOptional()
  @IsEmail({}, { message: "Email deve ser válido" })
  email?: string;

  @IsOptional()
  @IsString({ message: "Localização deve ser uma string" })
  location?: string;

  @IsOptional()
  @IsString({ message: "Empresa deve ser uma string" })
  company?: string;

  @IsOptional()
  @IsString({ message: "Blog deve ser uma string" })
  blog?: string;
}
