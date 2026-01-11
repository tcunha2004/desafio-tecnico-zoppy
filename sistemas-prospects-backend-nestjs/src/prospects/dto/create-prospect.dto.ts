import { IsString, IsNotEmpty, Matches } from "class-validator";

/* ============================================
   DTO - Criar Prospect
   Apenas o username é necessário, o resto vem do GitHub
   ============================================ */
export class CreateProspectDto {
  @IsString({ message: "Username deve ser uma string" })
  @IsNotEmpty({ message: "Username é obrigatório" })
  @Matches(/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/, {
    message: "Username inválido. Deve seguir o padrão do GitHub.",
  })
  username: string;
}
