'use strict';

var path = require('path');

module.exports = {
    show404: function (res) {
        res.status(404);
        res.sendFile(path.resolve(__dirname + '/../app/static/errors/404.html'));
    }
};