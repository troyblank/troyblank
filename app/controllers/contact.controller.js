'use strict';

exports.render = function (req, res) {
    res.set('content-language', 'en').render('contact', {
        layout: 'main',
        title: 'Troy Blank Labs'
    });
};