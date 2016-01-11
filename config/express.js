'use strict';

var compress = require('compression'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    express = require('express'),
    flash = require('connect-flash'),
    handlebars = require('express-handlebars'),
    morgan = require('morgan');

module.exports = function () {
    var app = express();

    if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    } else {
        app.use(morgan('dev'));
    }

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.engine('hbs', handlebars({layoutsDir: __dirname + '/../app/views/layouts/', extname: ".hbs"}));
    app.set('views', __dirname + '/../app/views');
    app.set('view engine', 'hbs');

    app.use(flash());

    app.use(express.static(__dirname + '/../app/static'));
    app.use(express.static(__dirname + '/../app/public'));

    require('../app/routes/about.routes')(app);
    require('../app/routes/contact.routes')(app);
    require('../app/routes/index.routes')(app);
    require('../app/routes/specimen.routes')(app);

    // Custom error pages
    app.use(function(req, res) {
        res.status(404);
        res.render('404');
    });
    return app;
};