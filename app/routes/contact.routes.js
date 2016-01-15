'use strict';

module.exports = function (app) {

    app.index = require('../controllers/contact.controller');
    app.get('/contact', app.index.render);
    app.post('/contact', app.index.send);
};