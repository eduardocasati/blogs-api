# Documentação

## Métodos

Requisições para a API devem seguir os padrões:

| Método | Descrição |
|:---|:---|
| ```GET``` | Retorna informações de um ou mais registros. |
| ```POST``` | Utilizado para criar um novo registro. |

## Respostas

| Código | Descrição |
|:---|:---|
| ```200 OK``` | Requisição foi bem sucedida. |
| ```201 Created``` | Requisição foi bem sucedida e um novo recurso foi criado. |
| ```400 Bad Request``` | Erros de validação ou os campos informados não existem no sistema. |
| ```401 Unauthorized``` | A requisição não possui credenciais de autenticação válidas. |
| ```404 Not Found``` | O recurso solicitado não foi encontrado. |

## Autenticação

Com exceção da criação de usuário, todas as requisições para a API necessitam de um token de autenticação para serem executadas. O token pode ser obtido com um login válido ou ao criar um novo usuário com sucesso, e deve ser enviado no cabeçalho das requisições no formato abaixo:

```json
{
  "Authorization": "token",
}
```

## ROTAS

## Login

Fazer login no sistema.

### POST /login

- **Requisição**
  - Body
    ```json
    {
      "email": "user@email.com",
      "password": "123456"
    }
    ```
- **Respostas**
  - ✅ Login bem-sucedido
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJCcmV0dCBXaWx0c2hpcmUiLCJlbWFpbCI6ImJyZXR0QGVtYWlsLmNvbSIsImltYWdlIjpudWxsLCJpYXQiOjE3MDcxNzY2MzgsImV4cCI6MTcwNzc4MTQzOH0.RLrU3qSMR2nrjT7JPdF0pOnfgkRm_fUaU_wfRA53MV0"
    }
    ```
  - ⚠️ Os campos não foram devidamente preenchidos:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```
  - ❌ Usuário ou senha inválidos:
    ```json
    {
      "message": "Invalid fields"
    }
    ```
## Usuários

### POST /user

Criar um usuário.

##### Validações:

O campo ```displayName``` deve ter 8 caracteres ou mais; </br>
O campo ```email``` precisa ter o formato ```prefixo@domínio```;</br>
O campo ```password``` precisa ter 6 caracteres ou mais.

- **Requisição**
  - Body
    ```json
    {
      "displayName": "Name Surname",
      "email": "user@email.com",
      "password": "123456",
      "image": "https://exemple-images.com/images/1234567890/image.jpg"
    }
    // O campo image é opcional
    ```
- **Respostas**
  - ✅ Usuário criado com sucesso:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJCcmV0dCBXaWx0c2hpcmUiLCJlbWFpbCI6ImJyZXR0QGVtYWlsLmNvbSIsImltYWdlIjpudWxsLCJpYXQiOjE3MDcxNzY2MzgsImV4cCI6MTcwNzc4MTQzOH0.RLrU3qSMR2nrjT7JPdF0pOnfgkRm_fUaU_wfRA53MV0"
    }
    ```
  - ⚠️ O campo ```displayName``` não foi devidamente preenchido com 8 caracteres ou mais:
    ```json
    {
      "message": "\"displayName\" length must be at least 8 characters long"
    }
    ```
  - ⚠️ O campo email não foi devidamente preenchido com o formato prefixo@domínio:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```
  - ⚠️ O campo password não foi devidamente preenchido com 6 caracteres ou mais:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```
  - ❌ Usuário já existente:
    ```json
    {
      "message": "User already registered"
    }
    ```
### GET /user

Obter a lista completa de usuários.

- **Resposta**
  - ✅ Retorna a lista de usuários com sucesso:
    ```json
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
### GET /user/:id

Obter um usuário específico pelo ID do usuário.

- **Respostas**
  - ✅ Retorna a lista de usuários com sucesso:
    ```json
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    ```
  - ❌ Usuário não encontrado:
    ```json
    {
      "message": "User does not exist"
    }
    ```
## Categorias

### POST /categories

Criar uma categoria de postagem.

##### Validações:

O campo ```name``` não pode estar vazio.

- **Requisição**
  - Body
    ```json
    {
      "name": "Dicas"
    }
    ```
- **Respostas**
  - ✅ Categoria criada com sucesso:
    ```json
    {
      "id": 3,
      "name": "Dicas"
    }
    ```
  - ⚠️ O campo name não foi devidamente preenchido (o campo não pode estar em branco):
    ```json
    {
      "message": "\"name\" is required"
    }
    ```
### GET /categories

Obter a lista completa de categorias de postagens.

- **Resposta**
  - ✅ Retorna a lista de categorias com sucesso:
    ```json
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
## Blog Posts

### POST /post

Criar uma novo post no blog.

##### Validações:

Todos os campos devem estar preenchidos;</br>
Não é possível cadastrar um novo blog post com uma categoria inexistente.

- **Requisição**
  - Body
    ```json
    {
      "title": "Últimas atualizações, 1 de Agosto",
      "content": "O texto completo do post",
      "categoryIds": [1, 2]
    }
    ```
- **Respostas**
  - ✅ Post criado com sucesso:
    ```json
    {
      "id": 3,
      "title": "Últimas atualizações, 1 de Agosto",
      "content": "O texto completo do post",
      "userId": 1,
      "updated": "2022-05-18T18:00:01.196Z",
      "published": "2022-05-18T18:00:01.196Z"
    }
    ```
  - ⚠️ Todos os campos não foram devidamente preenchidos (nenhum campo pode estar em branco):
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```
  - ⚠️ Uma ou mais categorias informadas no campo categoryIds não existe:
    ```json
    {
      "message": "one or more \"categoryIds\" not found"
    }
    ```
### GET /post

Obter todos os blog posts.

- **Resposta**
  - ✅ Retorna os posts do blog com sucesso:
    ```json
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
### GET /post:id

Obter blog post específico pelo ID do blog post.

- **Respostas**
  - ✅ Retorna o blog post com sucesso:
    ```json
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
  - ❌ Blog post não encontrado:
    ```json
    {
      "message": "Post does not exist"
    }
    ```