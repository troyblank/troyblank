module.exports = function (grunt, options) {
    return {
        'build': [
            'clean',
            'uglify'
        ],

        'default': [
            'build'
        ]
    };
};