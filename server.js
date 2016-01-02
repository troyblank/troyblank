'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express'),
    config = require('./config/config');

var app = express();

var server = app.listen(config.port);

module.exports = app;

console.log('Server running at http://localhost:' + config.port + '/');