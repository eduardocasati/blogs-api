const express = require('express');

// IMPORTAÇÕES
const { 
  blogPostRoute, 
  categoryRoute, 
  loginRoute, 
  userRoute, 
} = require('./routes');
// ...

const app = express();

app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// ROTAS
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);
app.use('/post', blogPostRoute);
// ...

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
