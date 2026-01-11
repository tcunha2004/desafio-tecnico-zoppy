# Sistema de Gestão de Prospects Desenvolvedores

## 📋 Sobre o Projeto

Sistema web para gestão de prospects desenvolvedores, permitindo que empresas e recrutadores organizem e acompanhem candidatos em potencial através de seus perfis do GitHub. A aplicação oferece uma interface moderna e intuitiva para adicionar, visualizar, editar e remover prospects de forma eficiente.

## 🎨 Template no Figma

Acesse o design do projeto no Figma: [Desafio Zoppy - Figma](https://www.figma.com/site/xW8NRVPfReJTAakGgIbpN0/desafio-zoppy?node-id=0-1&t=PZIHekBVEvVgdx65-1)

## ✨ Funcionalidades

- **Adicionar Prospects**: Cadastre desenvolvedores através do username do GitHub
- **Listar Prospects**: Visualize todos os prospects cadastrados em um carrossel interativo e em lista completa
- **Buscar Prospects**: Encontre rapidamente prospects através da busca por username
- **Editar Informações**: Atualize dados dos prospects salvos
- **Remover Prospects**: Delete prospects que não são mais relevantes
- **Integração GitHub API**: Busca automática de informações do perfil do desenvolvedor

## 🛠️ Stack Tecnológica

### Backend

- **Node.js** com **NestJS 10.x**
- **MySQL** para persistência de dados
- **TypeORM** para gerenciamento do banco de dados
- **API REST** para comunicação

### Frontend

- **Angular 19**
- **TypeScript**
- **Tailwind CSS** para estilização
- **RxJS** para programação reativa

## 📝 Requisitos do Desafio

Este projeto foi desenvolvido como resposta ao desafio técnico com os seguintes requisitos:

- ✅ Backend construído com **Node.js** e **NestJS 10.x**
- ✅ Frontend construído com **Angular 19**
- ✅ Persistência de dados em banco relacional (**MySQL**)
- ✅ Implementação completa de **CRUD** (Create, Read, Update, Delete)
- ✅ Tema escolhido: **Clientes** (Prospects Desenvolvedores)
- ✅ Mínimo de **duas telas**: Dashboard com carrossel e Lista completa com busca
- ✅ Interface web moderna e responsiva

## 🎯 Tema: Clientes (Prospects)

O sistema trata prospects desenvolvedores como "clientes" em potencial para empresas de tecnologia, facilitando o processo de recrutamento e gestão de talentos através da organização de perfis do GitHub.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

| Ferramenta  | Versão Mínima    | Download                                      |
| ----------- | ---------------- | --------------------------------------------- |
| **Node.js** | 18.x ou superior | [nodejs.org](https://nodejs.org/)             |
| **npm**     | 9.x ou superior  | (vem com Node.js)                             |
| **MySQL**   | 8.x ou superior  | [mysql.com](https://dev.mysql.com/downloads/) |
| **Git**     | Qualquer versão  | [git-scm.com](https://git-scm.com/)           |

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/seu-usuario/desafio-tecnico-zoppy.git
cd desafio-tecnico-zoppy
```

### 2️⃣ Configure o Banco de Dados MySQL

1. Abra o MySQL e crie o banco de dados:

```sql
CREATE DATABASE prospects_db;
```

2. Anote suas credenciais do MySQL (usuário e senha)

### 3️⃣ Configure e Rode o Backend

```bash
# Entre na pasta do backend
cd sistemas-prospects-backend-nestjs

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_DATABASE=prospects_db

# Token do GitHub (opcional, mas recomendado para evitar limites de requisição)
GITHUB_TOKEN=seu_token_github

# Porta do servidor
PORT=3000
```

> 💡 **Dica**: Para gerar um token do GitHub, acesse: GitHub > Settings > Developer Settings > Personal Access Tokens > Generate new token

Agora rode o backend:

```bash
# Modo desenvolvimento (com hot reload)
npm run start:dev
```

✅ O backend estará rodando em: `http://localhost:3000/api`

### 4️⃣ Configure e Rode o Frontend

Abra um **novo terminal** e execute:

```bash
# Volte para a raiz do projeto (se necessário)
cd ..

# Entre na pasta do frontend
cd sistema-prospects-frontend-angular

# Instale as dependências
npm install

# Rode o frontend
ng serve
```

> Se o comando `ng` não for reconhecido, instale o Angular CLI globalmente:
>
> ```bash
> npm install -g @angular/cli
> ```

✅ O frontend estará rodando em: `http://localhost:4200`

### 5️⃣ Acesse a Aplicação

Abra o navegador e acesse: **http://localhost:4200**

🎉 **Pronto!** Você já pode usar o sistema.

---

## 📁 Estrutura do Projeto

```
desafio-tecnico-zoppy/
├── sistema-prospects-frontend-angular/   # Frontend Angular 19
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/          # Páginas (Home, List)
│   │   │   └── services/       # Serviços de API
│   │   └── styles.css          # Estilos globais
│   └── package.json
│
├── sistemas-prospects-backend-nestjs/    # Backend NestJS
│   ├── src/
│   │   ├── prospects/          # Módulo de Prospects
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── entities/       # Entidades do banco
│   │   │   └── services/       # Lógica de negócio
│   │   └── main.ts             # Entrada da aplicação
│   └── package.json
│
└── README.md
```

---

## 🔧 Comandos Úteis

### Backend

| Comando              | Descrição                    |
| -------------------- | ---------------------------- |
| `npm run start:dev`  | Roda em modo desenvolvimento |
| `npm run start:prod` | Roda em modo produção        |
| `npm run build`      | Compila o projeto            |

### Frontend

| Comando    | Descrição                          |
| ---------- | ---------------------------------- |
| `ng serve` | Roda o servidor de desenvolvimento |
| `ng build` | Compila para produção              |

---

**Desenvolvido como parte do desafio técnico para vaga de Desenvolvedor Full Stack Júnior**
