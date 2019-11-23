const withSass = require('@zeit/next-sass')

module.exports = withSass({
    exportPathMap: () => ({
        '/': { page: '/' },
        '/specimens/2016/dwollaDashboard': { page: '/2016/dwollaDashboard' },
        '/specimens/2016/dwollaDevDocs': { page: '/2016/dwollaDevDocs' },
        '/specimens/2015/dwollaStyleTiles': { page: '/2015/dwollaStyleTiles' },
        '/specimens/2014/dwollaNFC': { page: '/2014/dwollaNFC' },
        '/specimens/2014/foodHow': { page: '/2014/foodHow' },
        '/specimens/2014/bankProcessAnimation': { page: '/2014/bankProcessAnimation' },
        '/specimens/2013/ferdOVision': { page: '/2013/ferdOVision' },
        '/specimens/2012/lepsLogo': { page: '/2012/lepsLogo' },
        '/specimens/2011/troyBlankComV2': { page: '/2011/troyBlankComV2' },
        '/specimens/2010/webAnalyticsVisualization': { page: '/2010/webAnalyticsVisualization' },
        '/specimens/2010/inYourPocketCommercial': { page: '/2010/inYourPocketCommercial' },
        '/specimens/2010/digitalHeader': { page: '/2010/digitalHeader' },
        '/specimens/2010/chiefsZone': { page: '/2010/chiefsZone' },
        '/specimens/2010/AidsWalkKickOffVideo': { page: '/2010/aidsWalkKickOffVideo' },
        '/specimens/2009/theHolidayHQ': { page: '/2009/theHolidayHQ' },
        '/specimens/2009/recurringCircles': { page: '/2009/recurringCircles' },
        '/specimens/2009/kurcaMysteryGame': { page: '/2009/kurcaMysteryGame' },
        '/specimens/2009/idmlParser': { page: '/2009/idmlParser' },
        '/specimens/2009/demoReel': { page: '/2009/demoReel' },
        '/specimens/2009/cubicCurve': { page: '/2009/cubicCurve' },
        '/specimens/2009/arrowFlashNavigation': { page: '/2009/arrowFlashNavigation' }
    })
});
