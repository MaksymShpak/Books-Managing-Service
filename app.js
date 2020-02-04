'use strict';

const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./api/routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

module.exports.handler = serverless(app);