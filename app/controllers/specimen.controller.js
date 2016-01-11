'use strict';

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
            res.render('404');
        }
    });
};