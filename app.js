const express = require('express');
const mongoose = require('mongoose');

const { PORT = 4000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', { useNewUrlParser: true });

app.get('/users/me', );
app.patch('/users/me', );
app.get('/movies', );
app.post('/movies', );
app.delete('/movies/_id', );

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
