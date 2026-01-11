# Sistema de Gestão de Prospects (MVP Frontend em React)

Este repositório contém uma **versão MVP (prova de conceito)** do frontend do “Sistema de Gestão de Prospects Desenvolvedores”, criada como parte de um **teste técnico para vaga de emprego**.

O enunciado original do desafio previa **Angular 19 no frontend** e **NestJS + MySQL no backend**. Antes de iniciar a versão completa, optei por construir primeiro um **MVP em React** (por ter mais familiaridade), para validar a interface, navegação e a experiência do usuário.

## 🎯 Objetivo do MVP

- Validar o fluxo principal de navegação e layout (Dashboard + Lista)
- Prototipar o carrossel de prospects e a tela de listagem
- Criar uma base sólida para evoluir com integração à API do GitHub e backend

## ✅ O que está implementado (estado atual)

- **2 telas principais**
  - **Home/Dashboard** com carrossel de prospects
  - **Lista completa** com campo de busca (UI)
- **Rotas** com React Router
- **UI moderna** usando Styled Components

> Observação: neste momento o MVP utiliza **dados mockados (estáticos)** nas telas. A integração real (GitHub API + persistência/CRUD) fica como evolução.

## 🧩 Escopo do desafio (referência)

O sistema trata prospects desenvolvedores como “clientes” em potencial para empresas de tecnologia, facilitando o acompanhamento de candidatos via perfis do GitHub.

Funcionalidades esperadas na versão completa:

- Adicionar prospect por username do GitHub
- Listar prospects (carrossel + lista)
- Buscar prospect por username
- Editar informações salvas
- Remover prospects
- Integrar com GitHub API
- Persistir em banco relacional (ex.: MySQL)

## 🛠️ Stack do MVP (frontend)

- React 19 + TypeScript
- Vite
- React Router
- Styled Components
- Swiper (carrossel)
- React Icons

---

**MVP desenvolvido como parte de um desafio técnico (Full Stack Júnior).**
