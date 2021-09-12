const express = require('express');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects')
const app  = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

module.exports = app;