module.exports = function (grunt, options) {
    return {
        'build': [
            'clean',
            'uglify'
        ],

        deploy: [
            'sshexec'
        ],

        'default': [
            'build'
        ]
    };
};