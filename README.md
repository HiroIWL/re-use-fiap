# ReUse FIAP

Aplicativo mobile (Expo Web) para troca de produtos, desenvolvido com foco em reuso e sustentabilidade.

---

## 🚀 Tecnologias utilizadas

- [Expo](https://expo.dev/)
- React Native (com Web support)
- Expo Router
- JSON Server (mock API REST local)
- AsyncStorage
- Context API + Hooks

---

## 🛠️ Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar a API mockada

```bash
npm run db
```

> Esse comando roda o JSON Server local com o arquivo `db.json`:
>
> `json-server --watch db.json --port 3001`

A API estará acessível via `http://localhost:3001`.

### 3. Iniciar o app no navegador

```bash
npm run web
```

> ⚠️ Atualmente o app funciona apenas com **`expo run:web` ou `npm run web`**, pois as requisições estão configuradas para usar `localhost`.
> Para rodar no celular, você deverá alterar o IP da API manualmente.

---

## 🔐 Autenticação com Hook

Criamos o hook `useAuth` com:

- `register(nome, email, senha)` → cria um novo usuário (`POST /users`)
- `login(email, senha)` → autentica usuário (`GET /users`)
- `logout()` → remove dados do usuário localmente
- `AsyncStorage` para manter o login persistente

---

## 📦 Gerenciamento de Produtos

Criamos também o hook `useProducts`, responsável por:

- Listar produtos cadastrados (`GET /products`)
- Adicionar novos produtos (`POST /products`)
- Persistir imagens como base64
- Atualizar o estado global automaticamente

---

## 🧩 Funcionalidades principais

- Cadastro e login de usuários
- Criação de produto com até 6 fotos
- Modal de envio de proposta
- Swipe cards estilo Tinder
- Telas de "Minhas propostas" e "Meus produtos"
- Mock visual com imagens reais da internet (para produtos de exemplo)

---

## 📁 Estrutura de dados (db.json)

```json
{
  "users": [],
  "products": []
}
```

Você pode popular esse arquivo manualmente ou via tela de cadastro do app.

---

## ✅ Próximos passos sugeridos

- Criar sistema de envio e recebimento de propostas
- Adicionar suporte para deletar e editar produtos
- Conectar com backend real (Ex: Firebase, FastAPI, Node/Express)

---

## 🤝 Créditos

Projeto feito para fins educacionais na FIAP.
Sinta-se livre para clonar, modificar e evoluir.

- [Expo Docs](https://docs.expo.dev/)
- [JSON Server](https://github.com/typicode/json-server)
- [React Native](https://reactnative.dev/)
