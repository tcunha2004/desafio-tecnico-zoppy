import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Prospect } from "../entities/prospect.entity";
import { CreateProspectDto, UpdateProspectDto } from "../dto";
import { GithubService } from "./github.service";

/* ============================================
   SERVIÇO - Gerenciamento de Prospects
   Implementa toda a lógica de negócio do CRUD
   ============================================ */
@Injectable()
export class ProspectsService {
  constructor(
    @InjectRepository(Prospect)
    private readonly prospectRepository: Repository<Prospect>,
    private readonly githubService: GithubService
  ) {}

  /* ============================================
     CREATE - Adiciona novo prospect via username GitHub
     ============================================ */
  async create(createProspectDto: CreateProspectDto): Promise<Prospect> {
    const { username } = createProspectDto;

    // Verifica se o prospect já existe no banco
    const existingProspect = await this.prospectRepository.findOne({
      where: { username: username.toLowerCase() },
    });

    if (existingProspect) {
      throw new ConflictException(
        `Prospect com username "${username}" já existe no sistema`
      );
    }

    // Busca dados do usuário no GitHub
    const githubUser = await this.githubService.getUser(username);

    // Cria a entidade com os dados do GitHub
    const prospect = this.prospectRepository.create({
      username: githubUser.login.toLowerCase(),
      name: githubUser.name || githubUser.login,
      avatarUrl: githubUser.avatar_url,
      bio: githubUser.bio,
      email: githubUser.email,
      location: githubUser.location,
      company: githubUser.company,
      blog: githubUser.blog,
      publicRepos: githubUser.public_repos,
      followers: githubUser.followers,
      following: githubUser.following,
      githubId: githubUser.id,
      githubUrl: githubUser.html_url,
    });

    // Salva no banco e retorna
    return this.prospectRepository.save(prospect);
  }

  /* ============================================
     READ ALL - Lista todos os prospects
     ============================================ */
  async findAll(): Promise<Prospect[]> {
    return this.prospectRepository.find({
      order: { createdAt: "DESC" }, // Mais recentes primeiro
    });
  }

  /* ============================================
     READ ONE - Busca prospect por ID
     ============================================ */
  async findOne(id: number): Promise<Prospect> {
    const prospect = await this.prospectRepository.findOne({
      where: { id },
    });

    if (!prospect) {
      throw new NotFoundException(`Prospect com ID ${id} não encontrado`);
    }

    return prospect;
  }

  /* ============================================
     READ BY USERNAME - Busca prospect por username
     ============================================ */
  async findByUsername(username: string): Promise<Prospect> {
    const prospect = await this.prospectRepository.findOne({
      where: { username: username.toLowerCase() },
    });

    if (!prospect) {
      throw new NotFoundException(
        `Prospect com username "${username}" não encontrado`
      );
    }

    return prospect;
  }

  /* ============================================
     UPDATE - Atualiza dados de um prospect
     ============================================ */
  async update(
    id: number,
    updateProspectDto: UpdateProspectDto
  ): Promise<Prospect> {
    const prospect = await this.findOne(id);

    // Mescla os dados atualizados
    Object.assign(prospect, updateProspectDto);

    return this.prospectRepository.save(prospect);
  }

  /* ============================================
     REFRESH - Atualiza dados do GitHub
     ============================================ */
  async refresh(id: number): Promise<Prospect> {
    const prospect = await this.findOne(id);

    // Busca dados atualizados do GitHub
    const githubUser = await this.githubService.getUser(prospect.username);

    // Atualiza os campos com dados do GitHub
    prospect.name = githubUser.name || githubUser.login;
    prospect.avatarUrl = githubUser.avatar_url;
    prospect.bio = githubUser.bio;
    prospect.email = githubUser.email;
    prospect.location = githubUser.location;
    prospect.company = githubUser.company;
    prospect.blog = githubUser.blog;
    prospect.publicRepos = githubUser.public_repos;
    prospect.followers = githubUser.followers;
    prospect.following = githubUser.following;

    return this.prospectRepository.save(prospect);
  }

  /* ============================================
     DELETE - Remove um prospect do sistema
     ============================================ */
  async remove(id: number): Promise<void> {
    const prospect = await this.findOne(id);
    await this.prospectRepository.remove(prospect);
  }

  /* ============================================
     SEARCH - Busca prospects por termo
     ============================================ */
  async search(query: string): Promise<Prospect[]> {
    return this.prospectRepository
      .createQueryBuilder("prospect")
      .where("prospect.username LIKE :query", { query: `%${query}%` })
      .orWhere("prospect.name LIKE :query", { query: `%${query}%` })
      .orWhere("prospect.email LIKE :query", { query: `%${query}%` })
      .orderBy("prospect.createdAt", "DESC")
      .getMany();
  }
}
