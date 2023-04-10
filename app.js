'use strict';

//Packages list
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
//Setting up body-parser package for parsing form data
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//Setting up json data
app.use(express.json());

//Importing .env file for enviromental variables
const env = require('dotenv').config();
const PORT = process.env.APP_PORT | 3000;

app.get('/', (req, res) => {
  res.send('Alpha server works');
});

app.use('', require('./routes'));

//Serving app
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
