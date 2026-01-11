# Sistema de Gestão de Prospects - Backend

Backend desenvolvido em **NestJS 10.x** para o Sistema de Gestão de Prospects.

## 🚀 Tecnologias

- **NestJS 10.x** - Framework Node.js
- **TypeORM** - ORM para banco de dados
- **MySQL** - Banco de dados relacional
- **Axios** - Requisições HTTP para GitHub API
- **Class Validator** - Validação de dados

## 📋 Pré-requisitos

- Node.js 18+
- MySQL 8.x
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório e acesse a pasta do backend:**

```bash
cd sistemas-prospects-backend-nestjs
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o banco de dados:**

Crie o banco de dados MySQL:

```sql
CREATE DATABASE prospects_db;
```

4. **Configure as variáveis de ambiente:**

Copie o arquivo de exemplo e configure:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=prospects_db
PORT=3000
GITHUB_TOKEN=seu_token_opcional
```

5. **Execute a aplicação:**

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📡 Endpoints da API

Base URL: `http://localhost:3000/api`

### Prospects

| Método   | Endpoint                  | Descrição                 |
| -------- | ------------------------- | ------------------------- |
| `GET`    | `/prospects`              | Lista todos os prospects  |
| `GET`    | `/prospects?search=termo` | Busca prospects por termo |
| `GET`    | `/prospects/:id`          | Busca prospect por ID     |
| `POST`   | `/prospects`              | Cria novo prospect        |
| `PUT`    | `/prospects/:id`          | Atualiza prospect         |
| `POST`   | `/prospects/:id/refresh`  | Atualiza dados do GitHub  |
| `DELETE` | `/prospects/:id`          | Remove prospect           |

### Exemplos de Requisições

**Criar prospect:**

```bash
curl -X POST http://localhost:3000/api/prospects \
  -H "Content-Type: application/json" \
  -d '{"username": "tcunha2004"}'
```

**Listar prospects:**

```bash
curl http://localhost:3000/api/prospects
```

**Buscar por termo:**

```bash
curl http://localhost:3000/api/prospects?search=thiago
```

**Atualizar prospect:**

```bash
curl -X PUT http://localhost:3000/api/prospects/1 \
  -H "Content-Type: application/json" \
  -d '{"bio": "Nova bio personalizada"}'
```

**Deletar prospect:**

```bash
curl -X DELETE http://localhost:3000/api/prospects/1
```

## 📁 Estrutura do Projeto

```
src/
├── main.ts                 # Bootstrap da aplicação
├── app.module.ts           # Módulo raiz
└── prospects/
    ├── prospects.module.ts     # Módulo de prospects
    ├── prospects.controller.ts # Controller REST
    ├── dto/
    │   ├── create-prospect.dto.ts
    │   └── update-prospect.dto.ts
    ├── entities/
    │   └── prospect.entity.ts  # Entidade TypeORM
    └── services/
        ├── prospects.service.ts # Lógica de negócio
        └── github.service.ts    # Integração GitHub API
```

## 🔑 Variáveis de Ambiente

| Variável       | Descrição               | Padrão       |
| -------------- | ----------------------- | ------------ |
| `DB_HOST`      | Host do MySQL           | localhost    |
| `DB_PORT`      | Porta do MySQL          | 3306         |
| `DB_USERNAME`  | Usuário do MySQL        | root         |
| `DB_PASSWORD`  | Senha do MySQL          | -            |
| `DB_DATABASE`  | Nome do banco           | prospects_db |
| `PORT`         | Porta da API            | 3000         |
| `GITHUB_TOKEN` | Token GitHub (opcional) | -            |

## 📝 Notas

- O token do GitHub é opcional mas recomendado para evitar rate limiting
- A tabela é criada automaticamente pelo TypeORM (synchronize: true)
- Em produção, desabilite o `synchronize` e use migrations

## 🤝 Integração com Frontend

O backend está configurado com CORS para aceitar requisições de:

- `http://localhost:4200` (Angular dev server)
- `http://127.0.0.1:4200`

## 📄 Licença

Este projeto foi desenvolvido para o Desafio Técnico Zoppy.
