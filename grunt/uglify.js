module.exports = {
    options: {
        compress: true,
        mangle: true,
        sourceMap: true
    },
    deploy: {
        files: {
            'app/public/js/troyblank.js': [
                'app/assets/js/jquery.mousewheel.js',
                'app/assets/js/raphael-min.js',
                'app/assets/js/HashBangHistory.js',
                'app/assets/js/TroyBlankCom.js',
                'app/assets/js/VideoPlayer.js',
                'app/assets/js/PortfolioCanvasMedia.js'
            ]
        }
    }
};