# Teste Crud


## Objetivos
  -  Criar uma API em NodeJS com integração com banco de dados MySQL
  
## Instruções para rodar
  - Alterar o arquivo 'knexfile.js' campos: host, user, password, database; Para os que deseja realizar as migrations.
<<<<<<< HEAD
  ```javascript
    //exemplo
    host: "localhost",
    user: "root",
    password: "password",
    database: "crud"
  ```
  - Criar um arquivo .env com ```AUTH_SECRET``` e um valor string.
=======
  - Criar um arquivo ```.env``` com ```AUTH_SECRET``` receber uma string.
>>>>>>> 95a890c727c68ce47a70c0b11a5e07d75ad98ba4
  - Rodar o comando ```knex migrate:latest```
  > Caso não possua o knex instalado globalmente utilize ```npx knex migrate:latest```
  - Rodar o comando ```knex seed:run```
  > Caso não possua o knex instalado globalmente utilize ```npx knex seed:run```
  - Rodar o comando ```npm install```
  >Porta utilizada para backend: 5000
  - Rodar o comando npm start
  - Utilizar o repositório crudFront para o front-end
