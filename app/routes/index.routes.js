'use strict';

module.exports = function (app) {

    app.index = require('../controllers/index.controller');
    app.get('/', app.index.render);
};