'use strict';

module.exports = function (app) {

    app.specimen = require('../controllers/specimen.controller');
    app.get('/specimens/:year/:specimen', app.specimen.render);
};