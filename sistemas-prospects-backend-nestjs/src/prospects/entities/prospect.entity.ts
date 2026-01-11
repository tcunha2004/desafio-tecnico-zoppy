import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/* ============================================
   ENTIDADE PROSPECT
   Representa um potencial desenvolvedor salvo no sistema
   ============================================ */
@Entity("prospects")
export class Prospect {
  // ============================================
  // ID - Identificador único auto-gerado
  // ============================================
  @PrimaryGeneratedColumn()
  id!: number;

  // ============================================
  // USERNAME - Username do GitHub (obrigatório e único)
  // ============================================
  @Column({ unique: true, length: 100 })
  username!: string;

  // ============================================
  // NAME - Nome completo do usuário
  // ============================================
  @Column({ length: 255, nullable: true })
  name!: string | null;

  // ============================================
  // AVATAR URL - URL da foto de perfil do GitHub
  // ============================================
  @Column({ length: 500, nullable: true })
  avatarUrl!: string | null;

  // ============================================
  // BIO - Biografia/descrição do perfil
  // ============================================
  @Column({ type: "text", nullable: true })
  bio!: string | null;

  // ============================================
  // EMAIL - Email público do perfil
  // ============================================
  @Column({ length: 255, nullable: true })
  email!: string | null;

  // ============================================
  // LOCATION - Localização do usuário
  // ============================================
  @Column({ length: 255, nullable: true })
  location!: string | null;

  // ============================================
  // COMPANY - Empresa atual
  // ============================================
  @Column({ length: 255, nullable: true })
  company!: string | null;

  // ============================================
  // BLOG - Website/blog pessoal
  // ============================================
  @Column({ length: 500, nullable: true })
  blog!: string | null;

  // ============================================
  // PUBLIC REPOS - Número de repositórios públicos
  // ============================================
  @Column({ default: 0 })
  publicRepos!: number;

  // ============================================
  // FOLLOWERS - Número de seguidores
  // ============================================
  @Column({ default: 0 })
  followers!: number;

  // ============================================
  // FOLLOWING - Número de pessoas seguindo
  // ============================================
  @Column({ default: 0 })
  following!: number;

  // ============================================
  // GITHUB ID - ID único do usuário no GitHub
  // ============================================
  @Column({ nullable: true })
  githubId!: number | null;

  // ============================================
  // GITHUB URL - URL do perfil no GitHub
  // ============================================
  @Column({ length: 500, nullable: true })
  githubUrl!: string | null;

  // ============================================
  // CREATED AT - Data de criação no sistema
  // ============================================
  @CreateDateColumn()
  createdAt!: Date;

  // ============================================
  // UPDATED AT - Data da última atualização
  // ============================================
  @UpdateDateColumn()
  updatedAt!: Date;
}
