'use strict';

var nodemailer = require('nodemailer'),
    emailAuth = require('../../config/auth/emailAuth'),
    footer = '⚠ DO NOT REPLY TO THIS EMAIL, REPLY TO THE EMAIL BELOW ⚠',
    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: emailAuth.user,
            pass: emailAuth.password
        }
    }),
    email = {
        from: 'automation@troyblank.com',
        to: 'troy@troyblank.com',
        subject: '☠ FROM TROYBLANK.COM ☠'
    };

exports.render = function (req, res) {
    res.set('content-language', 'en').render('contact', {
        layout: 'main',
        title: 'Troy Blank Labs'
    });
};

exports.send = function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var fromEmail = req.body.name + ' ☛ ' + req.body.email + ' ☚';

    email.text = req.body.message + '\r\n';
    email.text += footer + '\r\n';
    email.text += fromEmail;
    email.html = '<p>' + req.body.message + '</p>';
    email.html += '<p>' + footer + '</p>';
    email.html += '<p>' + fromEmail + '</p>';

    transporter.sendMail(email, function(error, info){
        if(error){
            return res.sendStatus(400);
        }

        res.json({'success': true});
    });
}