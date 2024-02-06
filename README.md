# ✍️ API de Blogs

![Node.js Badge](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express Badge](https://img.shields.io/badge/express-black?style=for-the-badge&logo=express&logoColor=white) ![JSON Web Tokens Badge](https://img.shields.io/badge/json%20web%20tokens-black?style=for-the-badge&logo=json%20web%20tokens&logoColor=white) ![Sequelize Badge](https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) ![Docker Badge](https://img.shields.io/badge/docker-1D63ED?style=for-the-badge&logo=docker&logoColor=white)

> _Este projeto foi desenvolvido como parte da **[Formação em Desenvolvimento Web](https://www.betrybe.com/formacao-desenvolvimento-web)** pela **[Trybe](https://www.betrybe.com/)**, no **Módulo: Back-end**, **Seção 6: ORM e Autenticação**_

#### Autor: **Eduardo Casati**

[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/eduardocasati/)

## Objetivos do Projeto

Este projeto teve como objetivo consolidar e avaliar conhecimentos dos seguintes tópicos:

-  Containers (Docker)
-  Arquitetura de Software MSC
-  Node.js
-  Express.js 
-  JSON Web Tokens
-  ORM (Sequelize)

## O que foi Desenvolvido

O projeto consiste em uma API e um banco de dados para a produção de conteúdo para um blog.

### Rotas da API

#### 1. LOGIN

      POST /login

O corpo da requisição deve seguir o formato abaixo:

<details><summary>Formato da Requisição:</summary>

```
{
  "email": "user@email.com",
  "password": "123456"
}
```

</details>

<details>
<summary>Respostas:</summary>
</br>

- ✅ **Login bem-sucedido:**

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJCcmV0dCBXaWx0c2hpcmUiLCJlbWFpbCI6ImJyZXR0QGVtYWlsLmNvbSIsImltYWdlIjpudWxsLCJpYXQiOjE3MDcxNzY2MzgsImV4cCI6MTcwNzc4MTQzOH0.RLrU3qSMR2nrjT7JPdF0pOnfgkRm_fUaU_wfRA53MV0"
}
```

- ⚠️ **Os campos não foram devidamente preenchidos:**

```
{
  "message": "Some required fields are missing"
}
```


- ❌ **Usuário ou senha inválidos:**

```
{
  "message": "Invalid fields"
}
```

</details>

#### 2. USER

      POST /user

O corpo da requisição deve seguir o formato abaixo:

<details><summary>Formato da Requisição:</summary>

```
{
  "displayName": "Name Surname",
  "email": "user@email.com",
  "password": "123456",
  "image": "https://exemple-images.com/images/1234567890/image.jpg"
}
```

O campo ```image``` não é obrigatório.

</details>

<details>
<summary>Respostas:</summary>
</br>

- ✅ **Usuário criado com sucesso:**

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJCcmV0dCBXaWx0c2hpcmUiLCJlbWFpbCI6ImJyZXR0QGVtYWlsLmNvbSIsImltYWdlIjpudWxsLCJpYXQiOjE3MDcxNzY2MzgsImV4cCI6MTcwNzc4MTQzOH0.RLrU3qSMR2nrjT7JPdF0pOnfgkRm_fUaU_wfRA53MV0"
}
```

- ⚠️ **O campo ```displayName``` não foi devidamente preenchido com 8 caracteres ou mais**:

```
{
  "message": "\"displayName\" length must be at least 8 characters long"
}
```

- ⚠️ **O campo ```email``` não foi devidamente preenchido com o formato ```prefixo@domínio```**:

```
{
  "message": "\"email\" must be a valid email"
}
```

- ⚠️ **O campo ```password``` não foi devidamente preenchido com 6 caracteres ou mais**:

```
{
  "message": "\"password\" length must be at least 6 characters long"
}
```

- ❌ **Usuário já existente:**

```
{
  "message": "User already registered"
}
```

</details>

</br>

      GET /user

É necessário um token de autenticação passado no cabeçalho da requisição (obtido no endpoint de login).

<details>
<summary>Resposta:</summary>
</br>

- ✅ **Retorna a lista de usuários com sucesso:**

```
[
  {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  {
      "id": 2,
      "displayName": "Michael Schumacher",
      "email": "michaelSchumacher@gmail.com",
      "image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
  },
  {
      "id": 3,
      "displayName": "Ayrton Senna",
      "email": "ayrtonsenna@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Senninha_2.jpg/800px-Senninha_2.jpg"
  },

   /* ... */
]
```

</details>

</br>

      GET /user/:id

É necessário um token de autenticação passado no cabeçalho da requisição (obtido no endpoint de login).

<details>
<summary>Respostas:</summary>
</br>

- ✅ **Retorna o usuário com sucesso:**

```
{
  "id": 1,
  "displayName": "Lewis Hamilton",
  "email": "lewishamilton@gmail.com",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
}
```

- ❌ **Usuário não encontrado:**

```
{
  "message": "User does not exist"
}
```

</details>

#### 3. CATEGORIES

      POST /categories

É necessário um token de autenticação passado no cabeçalho da requisição (obtido no endpoint de login).

O corpo da requisição deve seguir o formato abaixo:

<details><summary>Formato da Requisição:</summary>

```
{
  "name": "Dicas"
}
```

</details>

<details>
<summary>Respostas:</summary>
</br>

- ✅ **Categoria criada com sucesso:**

```
{
  "id": 3,
  "name": "Dicas"
}
```

- ⚠️ **O campo ```name``` não foi devidamente preenchido (o campo não pode estar em branco)**:

```
{
  "message": "\"name\" is required"
}
```

</details>

</br>

      GET /categories

É necessário um token de autenticação passado no cabeçalho da requisição (obtido no endpoint de login).

<details>
<summary>Resposta:</summary>
</br>

- ✅ **Retorna a lista de categorias com sucesso:**

```
[
  {
      "id": 1,
      "name": "Inovação"
  },
  {
      "id": 2,
      "name": "Escola"
  },

  /* ... */
]
```

</details>

#### 4. POST

      POST /post

É necessário um token de autenticação passado no cabeçalho da requisição (obtido no endpoint de login).

O corpo da requisição deve seguir o formato abaixo:

<details><summary>Formato da Requisição:</summary>

```
{
  "title": "Últimas atualizações, 1 de Agosto",
  "content": "O texto completo do post",
  "categoryIds": [1, 2]
}
```

</details>

<details>
<summary>Respostas:</summary>
</br>

- ✅ **Post criado com sucesso:**

```
{
  "id": 3,
  "title": "Últimas atualizações, 1 de Agosto",
  "content": "O texto completo do post",
  "userId": 1,
  "updated": "2022-05-18T18:00:01.196Z",
  "published": "2022-05-18T18:00:01.196Z"
}
```

- ⚠️ **Todos os campos não foram devidamente preenchidos (nenhum campo pode estar em branco)**:

```
{
  "message": "Some required fields are missing"
}
```

- ⚠️ **Se uma ou mais categorias informadas no campo ```categoryIds``` não existir**:

```
{
  "message": "one or more \"categoryIds\" not found"
}
```

</details>

</br>

      GET /post

É necessário um token de autenticação passado no cabeçalho da requisição (obtido no endpoint de login).

<details>
<summary>Respostas:</summary>
</br>

- ✅ **Retorna os posts do blog com sucesso:**

```
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação",
        "PostCategory": {
           "postId": 1,
           "categoryId": 1
        }
      }
    ]
  },
  {
    "id": 2,
    "title": "Vamos que vamos",
    "content": "Foguete não tem ré",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 2,
      "displayName": "Michael Schumacher",
      "email": "michaelschumacher@gmail.com",
      "image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
    },
    "categories": [
      {
        "id": 2,
        "name": "Escola",
        "PostCategory": {
           "postId": 2,
           "categoryId": 2
        }
      }
    ]
  }, 

  /* ... */
]
```

</details>

</br>

      GET /post/:id

É necessário um token de autenticação passado no cabeçalho da requisição (obtido no endpoint de login).

O corpo da requisição deve seguir o formato abaixo:

<details>
<summary>Resposta:</summary>
</br>

- ✅ **Retorna o post com sucesso:**

```
{
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
      {
          "id": 1,
          "name": "Inovação",
          "PostCategory": {
              "postId": 1,
              "categoryId": 1
          }
      }
  ]
}
```

</details>

## Rodando o Projeto

Siga os passos abaixo:

1. Crie e inicie os containers: ```docker-compose up -d --build```
2. Acesse o terminal do container: ```docker exec -it blogs_api bash```
   - Os comandos a seguir devem ser executados no terminal do container
3. Instale as dependências: ```npm install```
4. Crie o banco de dados: ```npm run prestart```
5. Preencha o banco de dados: ```npm run seed```
6. Inicie o servidor: ```npm start```

Com o projeto inicializado após as etapas acima, você pode fazer requisições à API na porta 3001: ```http://localhost:3001/{rota}```.
