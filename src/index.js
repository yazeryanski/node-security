const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();

// Security Middlewares
app.use(helmet);

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../', 'public', 'index.html'))
})





app.listen(3000, () => {
  console.log('Listening on 3000 port');
})