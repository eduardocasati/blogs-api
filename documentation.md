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

Com exceção da criação de usuário, todas as requisições para a API necessitam de um token de autenticação para serem executadas. O token deve ser enviado no cabeçalho das requisições, e pode ser obtido com um login válido ou ao criar um novo usuário com sucesso.

## ROTAS

## Login

Fazer login no sistema.

### POST /login

- Requisição
  - Body
    ```json
      {
        "email": "user@email.com",
        "password": "123456"
      }
    ```
- Respostas
  - ✅ Login bem-sucedido
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJCcmV0dCBXaWx0c2hpcmUiLCJlbWFpbCI6ImJyZXR0QGVtYWlsLmNvbSIsImltYWdlIjpudWxsLCJpYXQiOjE3MDcxNzY2MzgsImV4cCI6MTcwNzc4MTQzOH0.RLrU3qSMR2nrjT7JPdF0pOnfgkRm_fUaU_wfRA53MV0"
      }
    ```
  - ⚠️ Os campos não foram devidamente preenchidos:
    ```
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

- Requisição
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
