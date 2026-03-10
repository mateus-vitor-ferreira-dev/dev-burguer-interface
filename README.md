<p align="center">

# 🍔 Dev Burguer

Sistema completo de pedidos para hamburgueria desenvolvido com **React, Node.js, PostgreSQL e MongoDB**.

</p>

<p align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

</p>

A aplicação permite que clientes naveguem pelo cardápio, adicionem produtos ao carrinho e realizem pedidos, enquanto administradores podem gerenciar produtos e pedidos através de um painel administrativo.

- **PostgreSQL** é utilizado para armazenar dados relacionais como usuários, produtos e categorias.
- **MongoDB** é utilizado para armazenar pedidos, permitindo maior flexibilidade na estrutura dos dados.

---

# 📚 Índice

- [🚀 Demo](#-demo)
- [🎥 Demonstração da Aplicação](#-demonstração-da-aplicação)
- [📸 Preview](#-preview)
- [🚀 Tecnologias](#-tecnologias)
- [🏗️ Arquitetura do Projeto](#️-arquitetura-do-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [⚙️ Instalação](#️-instalação)
- [🔑 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🌍 Deploy](#-deploy)
- [👨‍💻 Autor](#-autor)
- [📄 Licença](#-licença)

---

## 🚀 Demo

🌐 **Frontend:**  
https://dev-burguer.vercel.app

⚙️ **Backend API:**  
https://dev-burguer-api.onrender.com
---

# 🎥 Demonstração da Aplicação

<p align="center">

<a href="https://youtu.be/RE3y2AQ-KNk">

▶️ **Assistir Demonstração da Aplicação**

</a>

</p>

<p align="center">
  <a href="https://youtu.be/RE3y2AQ-KNk">
    <img src="https://img.youtube.com/vi/RE3y2AQ-KNk/0.jpg" width="800">
  </a>
</p>

# 📸 Preview

## 🏠 Home
<p align="center">
  <img src="./screenshots/home.png" width="800"/>
</p>

## 📋 Cardápio
<p align="center">
  <img src="./screenshots/menu.png" width="800"/>
</p>

## 🛒 Carrinho
<p align="center">
  <img src="./screenshots/carrinho.png" width="800"/>
</p>

## 💳 Pagamento
<p align="center">
  <img src="./screenshots/pagamento.png" width="800"/>
</p>

## 🔐 Login
<p align="center">
  <img src="./screenshots/login.png" width="800"/>
</p>

## 📝 Cadastro
<p align="center">
  <img src="./screenshots/cadastro.png" width="800"/>
</p>

---

# ⚙️ Painel Administrativo

## 📦 Gerenciamento de Produtos
<p align="center">
  <img src="./screenshots/admin-produtos.png" width="800"/>
</p>

## ➕ Criar Produto
<p align="center">
  <img src="./screenshots/admin-novo-produto.png" width="800"/>
</p>

## ✏️ Editar Produto
<p align="center">
  <img src="./screenshots/admin-editar-produto.png" width="800"/>
</p>

## 📑 Pedidos
<p align="center">
  <img src="./screenshots/admin-pedidos.png" width="800"/>
</p>

---

# 🚀 Tecnologias

## Frontend

- React
- Vite
- Styled Components
- React Router DOM
- React Hook Form
- Yup
- Axios
- React Toastify

## Backend

- Node.js
- Express
- PostgreSQL
- MongoDB
- Sequelize
- JWT
- Multer
- Stripe

---

## 🧠 Decisões de Arquitetura

O projeto utiliza dois bancos de dados com finalidades diferentes:

**PostgreSQL**

- Armazenamento de dados relacionais
- Usuários
- Produtos
- Categorias

**MongoDB**

- Armazenamento de pedidos
- Estrutura flexível para itens do pedido
- Melhor performance para leitura de documentos complexos

# 🏗️ Arquitetura do Projeto

O projeto está dividido em dois repositórios:

### Frontend (Interface)

Responsável pela interface do usuário.

Tecnologias principais:

- React
- Vite
- Styled Components

Repositório:  
https://github.com/mateus-vitor-ferreira-dev/dev-burguer-interface

---

### Backend (API)

Responsável pela lógica de negócio.

Principais responsabilidades:

- Autenticação de usuários
- Gerenciamento de produtos
- Gerenciamento de pedidos
- Integração com Stripe

Repositório:  
https://github.com/mateus-vitor-ferreira-dev/dev-burguer-api

---

# ✨ Funcionalidades

## Usuário

- Criar conta
- Fazer login
- Visualizar cardápio
- Adicionar produtos ao carrinho
- Remover produtos do carrinho
- Realizar checkout
- Pagamento com Stripe

## Administrador

- Criar novos produtos
- Editar produtos
- Marcar produtos em oferta
- Gerenciar pedidos
- Visualizar status dos pedidos

---

## 📊 Estatísticas do Repositório

![GitHub repo size](https://img.shields.io/github/repo-size/mateus-vitor-ferreira-dev/dev-burguer-interface)
![GitHub stars](https://img.shields.io/github/stars/mateus-vitor-ferreira-dev/dev-burguer-interface)
![GitHub forks](https://img.shields.io/github/forks/mateus-vitor-ferreira-dev/dev-burguer-interface)
![GitHub issues](https://img.shields.io/github/issues/mateus-vitor-ferreira-dev/dev-burguer-interface)

# ⚙️ Instalação

Clone o repositório

```bash
git clone https://github.com/mateus-vitor-ferreira-dev/dev-burguer-interface
cd dev-burguer-interface
```

Instale as dependências

```bash
npm install
```

Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

# 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```
VITE_API_URL=http://localhost:3001
```

---

# 📁 Estrutura do Projeto

```
src
 ├ components
 ├ containers
 ├ hooks
 ├ layouts
 ├ routes
 ├ services
 ├ styles
 └ assets
```

---

# 🌍 Deploy

### Frontend
Vercel / Netlify

### Backend
Render / Railway

---

# 👨‍💻 Autor

Desenvolvido por **Mateus Vitor Ferreira**

GitHub  
https://github.com/mateus-vitor-ferreira-dev

---

# 📄 Licença

Este projeto está sob a licença **MIT**.

