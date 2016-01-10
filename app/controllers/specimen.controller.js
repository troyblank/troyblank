'use strict';

exports.render = function (req, res) {
    var templateName = 'specimens/' + req.params.year + '/' + req.params.specimen;
    console.log(templateName);

    res.set('content-language', 'en').render(templateName, {
        layout: 'main',
        title: 'Troy Blank Labs | Specimen',
        bodyclass: 'standalone'
    });
};