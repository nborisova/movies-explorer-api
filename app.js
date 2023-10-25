const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { cors } = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 4000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors);
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/users', routerUsers);
app.use('/movies', routerMovies);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
