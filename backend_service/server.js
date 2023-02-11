const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./Routes/userRouter');

const app = express();
dotenv.config({ path: './config.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
const url = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Db connected successfully.');
  });

app.use(express.json());
app.use('/user', userRouter);
app.use('*', (req, res, next) => {
  res.status(403).json({
    status: 'Error',
    message: 'This Url hasnot setup yet!',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
