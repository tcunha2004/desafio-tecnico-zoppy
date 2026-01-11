import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

/* ============================================
   INTERFACE - Resposta da API do GitHub
   ============================================ */
export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  email: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

/* ============================================
   SERVIÇO - Integração com GitHub API
   ============================================ */
@Injectable()
export class GithubService {
  private readonly githubApiUrl = "https://api.github.com";

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  /* ============================================
     BUSCAR USUÁRIO - Obtém dados do perfil GitHub
     ============================================ */
  async getUser(username: string): Promise<GitHubUser> {
    try {
      // Monta os headers da requisição
      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Prospects-System",
      };

      // Adiciona token se disponível (aumenta rate limit)
      const token = this.configService.get<string>("GITHUB_TOKEN");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Faz a requisição para a API do GitHub
      const response = await firstValueFrom(
        this.httpService.get<GitHubUser>(
          `${this.githubApiUrl}/users/${username}`,
          { headers }
        )
      );

      return response.data;
    } catch (error: any) {
      // Trata erros específicos da API do GitHub
      if (error.response?.status === 404) {
        throw new HttpException(
          `Usuário "${username}" não encontrado no GitHub`,
          HttpStatus.NOT_FOUND
        );
      }

      if (error.response?.status === 403) {
        throw new HttpException(
          "Limite de requisições da API do GitHub excedido. Tente novamente mais tarde.",
          HttpStatus.TOO_MANY_REQUESTS
        );
      }

      throw new HttpException(
        "Erro ao buscar dados do GitHub. Tente novamente.",
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}
