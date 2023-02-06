const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: './config.env' });

app.get('/', (req, res) => {
  res.send('Hello There.');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
