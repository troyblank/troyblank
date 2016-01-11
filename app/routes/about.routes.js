'use strict';

module.exports = function (app) {

    app.index = require('../controllers/about.controller');
    app.get('/about', app.index.render);
};