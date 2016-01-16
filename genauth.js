var fs = require('fs'),
    prompt = require('prompt'),
    AUTH_DIR = 'config/auth/';

console.log('Please input your Gmail credentials to send emails from.'.underline.white);
prompt.message = '';
prompt.delimiter = '';
prompt.start();

prompt.get(['username', 'password'], function (err, result) {
    if (err) {
        return onErr(err);
    }

    setupFolderStructure();
    validateResults(result);
    writeGmailAuth(result.username, result.password);
});

function setupFolderStructure() {
    if (!fs.existsSync(AUTH_DIR)) {
        fs.mkdirSync(AUTH_DIR);
    }
}

function validateResults(result) {
    for (var prop in result) {
        if(result[prop].length === 0) {
            onErr(new Error(String(prop + ' needs to be defined').red));
        }
    }
}

function writeGmailAuth(username, password) {
    var content = 'module.exports = {\n' +
        '\tuser: \'' + username + '\',\n' +
        '\tpass: \'' + password + '\'\n' +
        '}';

    fs.writeFile(AUTH_DIR + 'emailAuth.js', content, function(err) {
        if(err) {
            return onErr(err);
        }

        onSucces();
    }); 
}

function onSucces() {
    console.log('\nAuth file made > config/auth/emailAuth.js.'.green);
    console.log('This app should now be able to send emails.');

    process.exit();
}

function onErr(err) {
    console.log('\n' + err);
    process.exit();
}