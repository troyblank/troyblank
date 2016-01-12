'use strict';

var path = require('path');

exports.render = function (req, res) {
    var templateName = 'specimens/' + req.params.year + '/' + req.params.specimen;

    res.set('content-language', 'en').render(templateName, {
        layout: 'main',
        title: 'Troy Blank Labs | Specimen',
        bodyclass: 'standalone'
    }, function(err, html){
        if(!err) {
            res.send(html);
        } else {
            res.status(404);
            res.sendFile(path.resolve(__dirname + '/../static/errors/404.html'));
        }
    });
};