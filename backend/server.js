const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
console.log( "URI is " + uri);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true } ).catch( error => console.log("Boo " +  error));

const connection = mongoose.connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
}).on('error', function (err) {
  console.log(err);
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});