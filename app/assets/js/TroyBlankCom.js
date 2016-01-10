var TroyBlankCom = new function() {

    this.standAlone = false;

    this.size = 'desktop'; //could be 'desktop' or 'mobile'
    this.device = 'desktop'; //could be 'desktop' or 'mobile'

    this.section = 'main'; //could be 'main', portfolio', 'about', or 'contact'
    this.currentLink = ''; //link for hasbang purposes
    this.trapKeys = false; //used to stop keys from triggering navigation on media that uses them

    this.portfolio_display_index = 0;
    this.portfolioThumbWidth = 0;
    this.portfolioLength = 0;
    this.scrollVal = 0;
    this.oldPortfolioThumbWidth = null;
    this.currentMainNavSectionCanvas = null;

    var done_loadingThumbs = false;

    var PORTFOLIO_CARD_RATIO = 0.70;
    this.SCROLL_PADDING = 45;
    var MOBILE_CLOSE_BUTTON_PADDING = 30;

    var IS_DEVICE_IPAD = navigator.userAgent.match(/iPad/i) != null;

    //backings
    var GRAPHIC_BACKINGS = ['tea_01.jpg', 'tea_02.jpg', 'tea_03.jpg'];
    var BACKING_ROOT = '/images/backings/';

    var root = this;

    this.init = function() {
        $('#content-wrapper .nav-left').css('opacity', 0);

        TroyBlankCom.standAlone = $('body.standalone').length > 0;

        TroyBlankCom.portfolioLength = $('#portfolioCarousel > a').length;

        TroyBlankCom.determineSize();
        TroyBlankCom.determineDevice();
        TroyBlankCom.resizeDom();
        TroyBlankCom.portfolioScroll();
        TroyBlankCom.addBacking();

        preloadPortfolioThumbs.checkPreloadPortfolioThumbs();

        addListeners();

        //page standalones
        if ($('body.standalone .portfolio-piece').length > 0) {
            new PortfolioCanvasMedia();
        } else if ($('body.standalone #contact-form').length > 0) {
            new Contact();
        }

        //hash bang history
        if (!TroyBlankCom.standalone) {
            HashBangHistory.init();
        }
    }

    this.addBacking = function() {
        if (!TroyBlankCom.standAlone && this.device != 'mobile') {
            var backgroundURL = BACKING_ROOT + GRAPHIC_BACKINGS[Math.floor(Math.random() * GRAPHIC_BACKINGS.length)];
            $('body').css('background', 'url("' + backgroundURL + '") repeat');
        }
    }

    function addListeners() {
        $(window).resize(resizeHand);
        $(window).focus(resizeHand);
        $(window).scroll(scrollHand);

        if (!TroyBlankCom.standAlone) {
            $('header .logo').on('click', homeClickHandler);
            $('header nav a').on('click', mainNavClick);
        } else {
            addStandaloneLinks();
        }

        TroyBlankCom.addEventListener(TroyBlankCom.ON_SECTION_CHANGE, sectionChangeHand);
        TroyBlankCom.addEventListener(TroyBlankCom.ON_HASH_NAV_CHANGE, onhashNavChange);

        if (IS_DEVICE_IPAD && !TroyBlankCom.standAlone) {
            document.ontouchmove = function(e) {
                e.preventDefault()
            };
        }
    }

    function addStandaloneLinks() {
        $('header .logo').attr('href', '/');
        $('header nav li a').each(function(i, ele) {
            $(ele).attr('href', $(ele).attr('data-href'));
            $(ele).removeAttr('data-href')
        });
    }

    this.setScrollVal = function(val) {
        TroyBlankCom.scrollVal = val;
        if (TroyBlankCom.scrollVal > TroyBlankCom.SCROLL_PADDING) {
            TroyBlankCom.scrollVal = TroyBlankCom.SCROLL_PADDING;
        } else if (TroyBlankCom.scrollVal < TroyBlankCom.scrollValRightLimit()) {
            TroyBlankCom.scrollVal = TroyBlankCom.scrollValRightLimit();
        }
    }

    this.scrollValRightLimit = function() {
        return -(TroyBlankCom.portfolioLength * TroyBlankCom.portfolioThumbWidth) + $(window).width();
    }

    this.changeSection = function(section) {
        TroyBlankCom.section = section;
        TroyBlankCom.dispatchEvent(TroyBlankCom.ON_SECTION_CHANGE);
    }

    this.adjustMobileScrollButtons = function() {
        if (TroyBlankCom.size == 'mobile') {
            if ($(window).scrollTop() < $('header').outerHeight()) {
                $('.close-btn').css('top', $('header').outerHeight() - $(window).scrollTop() + MOBILE_CLOSE_BUTTON_PADDING);
            } else {
                $('.close-btn').css('top', MOBILE_CLOSE_BUTTON_PADDING);
            }
        }
    }

    //---------------------------------------------------------------------------------------------
    //EVENT DISPATCHER
    //---------------------------------------------------------------------------------------------
    this.eventDispatcher = new Object();
    this.ON_SECTION_CHANGE = 'onSectionChange';
    this.ON_RESIZE = 'onResize';
    this.ON_CONTENT_READY = 'onSpecimenReady';
    this.ON_MEDIA_FLUSH_REQUEST = 'onMediaFlushRequest';
    this.ON_HASH_NAV_CHANGE = 'onHashNavChange';
    this.NAV_INTERACTION_MADE = 'navInteractionMade';

    this.addEventListener = function(type, handler) {
        if (TroyBlankCom.eventDispatcher[type] == undefined) {
            TroyBlankCom.eventDispatcher[type] = new Array();
        }
        TroyBlankCom.eventDispatcher[type].push(handler);
    }

    this.removeEventListener = function(type, handler) {
        var i = TroyBlankCom.eventDispatcher[type].length - 1;
        while (i >= 0) {
            if (TroyBlankCom.eventDispatcher[type][i] == handler) {
                TroyBlankCom.eventDispatcher[type].splice(i, 1);
                return;
            }
            i--;
        }
    }

    this.dispatchEvent = function(type, data) {
        if (TroyBlankCom.eventDispatcher[type] != undefined) {
            var callList = TroyBlankCom.eventDispatcher[type].slice(0);
            for (var i = 0; i < callList.length; i++) {
                callList[i].apply(this, [data]);
            }
        }
    }

    //---------------------------------------------------------------------------------------------
    //MAIN NAV
    //---------------------------------------------------------------------------------------------
    function showMainNavContent(url) {
        if (TroyBlankCom.section != 'mainNavContent') {
            TroyBlankCom.changeSection('mainNavContent');

            this.currentMainNavSectionCanvas = new sectionCanvas(url, '#mainNavContent');
        } else {
            this.currentMainNavSectionCanvas.reloadContent(url);
        }
    }

    this.removeMainNavActives = function() {
        $('header nav li a').removeClass('active');
    }

    //---------------------------------------------------------------------------------------------
    //SUB SECTION CANVAS -- for a portfolio piece or a main nav link
    //---------------------------------------------------------------------------------------------
    function sectionCanvas(assetURL, canvasID) {

        var scrollbar = null;
        var resizeActive = false;
        var assetURL = assetURL;
        var canvasID = canvasID;
        TroyBlankCom.currentLink = assetURL;

        function init() {
            addListeners();

            addContent();
            animateSectionOn(canvasID);
        }

        //RELOAD
        this.reloadContent = function(newURL) {
            assetURL = newURL
            TroyBlankCom.currentLink = assetURL;

            removeListeners();
            if ($('.fade-wrapper', canvasID).length <= 0) {
                $(canvasID).wrapInner('<div class="fade-wrapper" />')
            }

            if (TroyBlankCom.size == 'desktop') {
                $('.fade-wrapper', canvasID).stop().animate({
                    'opacity': 0
                }, 300, fadeOnNewContent);
            } else {
                $(canvasID, '.mask').empty();
                addListeners();
                addContent();
            }
        }

        function fadeOnNewContent() {
            $(canvasID, '.mask').empty();
            $('.fade-wrapper', canvasID).stop().animate({
                'opacity': 1
            }, 300);
            addListeners();
            addContent();
        }


        function addListeners() {
            resizeActive = true;

            $(document).on('keydown', keydownHand);

            $(canvasID + ' .nav-down').on('click', exitHand);
            $(canvasID + ' .nav-up').on('click', exitHand);
            $(canvasID + ' .close-btn').on('click', exitHand);

            TroyBlankCom.addEventListener(TroyBlankCom.ON_SECTION_CHANGE, onSectionChangeHand);
            TroyBlankCom.addEventListener(TroyBlankCom.ON_RESIZE, resizeHand);

            TroyBlankCom.addEventListener(TroyBlankCom.ON_CONTENT_READY, contentReadyHand);
        }

        function removeListeners() {
            resizeActive = false;

            $(document).off('keydown', keydownHand);

            $(canvasID + ' .nav-down').off('click', exitHand);
            $(canvasID + ' .nav-up').off('click', exitHand);
            $(canvasID + ' .close-btn').off('click', exitHand);

            TroyBlankCom.removeEventListener(TroyBlankCom.ON_SECTION_CHANGE, onSectionChangeHand);
            TroyBlankCom.removeEventListener(TroyBlankCom.ON_RESIZE, resizeHand);
            TroyBlankCom.removeEventListener(TroyBlankCom.ON_CONTENT_READY, contentReadyHand);
        }

        function addScrollBar() {
            $(canvasID + ' .scrollBar .thumb').css('top', 0);
            if (root.device != 'mobile') {
                scrollbar = new ScrollBar($(canvasID), 60);
            }
        }

        function keydownHand(e) {
            if (e.keyCode == 27) {
                //esc
                TroyBlankCom.changeSection('main');
            } else if (e.keyCode == 40) {
                //down
                if (!TroyBlankCom.trapKeys) {
                    TroyBlankCom.changeSection('main');
                }
            }
        }

        //ANIMATION
        function animateSectionOn(sectionID) {
            if (TroyBlankCom.size == 'desktop') {
                $(sectionID).css('display', 'block');
                $(sectionID).css('top', -$(window).height());

                $(sectionID).stop().animate({
                    'top': 0
                }, 250);
            } else {
                $(sectionID).css('display', 'block');
                $('#portfolioCarousel').css('display', 'none');

                $(window).scrollTop(0);
            }
        }

        function animateSectionOff(sectionID) {
            if (TroyBlankCom.size == 'desktop') {
                $(sectionID).stop().animate({
                    'top': $(window).height()
                }, 300, function() {
                    $(this).css('display', 'none');
                    if (root.section == 'main') {
                        TroyBlankCom.dispatchEvent(TroyBlankCom.ON_MEDIA_FLUSH_REQUEST);
                    }
                });
            } else {
                $(sectionID).css('display', 'none');
                $('#portfolioCarousel').css('display', 'block');

                $(window).scrollTop(0);
                if (root.section == 'main') {
                    TroyBlankCom.dispatchEvent(TroyBlankCom.ON_MEDIA_FLUSH_REQUEST);
                }
            }
        }

        //DESTROY
        function exit() {
            TroyBlankCom.dispatchEvent(TroyBlankCom.NAV_INTERACTION_MADE);

            removeListeners();
            removePreloader();
            animateSectionOff(canvasID);

            if (scrollbar != null) {
                scrollbar.destroy();
            }
        }

        //HANDLERS
        function resizeHand() {
            if (resizeActive) {
                $(canvasID).css('top', 0);
                if (scrollbar != null) {
                    scrollbar.refreshDisplay();
                }
            }
        }

        function exitHand() {
            TroyBlankCom.changeSection('main');
        }

        function onSectionChangeHand() {
            if (canvasID == '#portfolioCanvas' && TroyBlankCom.section != 'portfolio') {
                exit();
                ImageCenterer.centerImages();
            } else if (canvasID == '#mainNavContent' && TroyBlankCom.section != 'mainNavContent') {
                exit();
                ImageCenterer.centerImages();
            }
        }

        function contentReadyHand() {
            addScrollBar();
        }

        //LOADER
        function addContent() {
            addPreloader();
            loadContent();
        }

        function postLoadInit() {
            switch (TroyBlankCom.section) {
                case 'portfolio':
                    new PortfolioCanvasMedia();
                    break;
                case 'mainNavContent':
                    postLoadMainNavInit();
                    TroyBlankCom.dispatchEvent(TroyBlankCom.ON_CONTENT_READY);
                    break;
            }
        }

        function trackPageWithGoogleAnalytics() {
            if (_gaq != undefined) {
                _gaq.push(['_trackPageview', assetURL])
            }
        }

        function postLoadMainNavInit() {
            if ($('#contact-form').length > 0) {
                new Contact();
            }
        }

        function loadContent() {
            $(canvasID + ' .mask').load(assetURL + ' .content-cnt .content', loadedContentHand);
        }

        function loadedContentHand() {
            removePreloader();
            postLoadInit();
            trackPageWithGoogleAnalytics();
        }

        function addPreloader() {
            $(canvasID).prepend('<div id="preloader_content" class="atomic-preloader" />');
            preloader = new atomicPreloader('preloader_content', true);
        }

        function removePreloader() {
            if ($('#preloader_content').length > 0) {
                preloader.destroy();
                $('#preloader_content').remove();
            }
        }

        init();
    }
    //---------------------------------------------------------------------------------------------
    //SCROLL PORTFOLIO
    //---------------------------------------------------------------------------------------------
    this.portfolioScroll = function() {

        var SCROLL_MULTIPLIER = 150;

        function init() {
            setStage();
            refreshListeners();
            addPermaListeners();
        }

        function setStage() {
            TroyBlankCom.scrollVal = TroyBlankCom.SCROLL_PADDING;
            $('#portfolioCarousel').css('left', TroyBlankCom.scrollVal);
            $('#portfolioCarousel').css('display', 'block');
        }

        function refreshListeners() {
            removeListeners();
            addListeners();
        }

        function removeListeners() {
            $('#content-wrapper').off('mousewheel', onMouseWheel);
            $(window).off('scroll', scrollHand);
            $(document).off('keydown', keydownHand);

            $('#content-wrapper .nav-left > a').off('click', navClickHand);
            $('#content-wrapper .nav-right > a').off('click', navClickHand);

            $('#portfolioCarousel > a').off('click', portfolioClickHand);
        }

        function addListeners() {
            $('#content-wrapper').on('mousewheel', onMouseWheel);
            $(window).on('scroll', scrollHand);
            $(document).on('keydown', keydownHand);

            $('#content-wrapper .nav-left > a').on('click', navClickHand);
            $('#content-wrapper .nav-right > a').on('click', navClickHand);

            $('#portfolioCarousel > a').on('click', portfolioClickHand);
        }

        function addPermaListeners() {
            TroyBlankCom.addEventListener(TroyBlankCom.ON_SECTION_CHANGE, onSectionChangeHand);
            TroyBlankCom.addEventListener(TroyBlankCom.ON_HASH_NAV_CHANGE, onhashNavChange);

        }

        function removeListeners() {
            $('#content-wrapper').off('mousewheel', onMouseWheel);
            $(window).off('scroll', scrollHand);
            $(document).off('keydown', keydownHand);

            $('#content-wrapper .nav-left > a').off('click', navClickHand);
            $('#content-wrapper .nav-right > a').off('click', navClickHand);

            $('#portfolioCarousel > a').off('click', portfolioClickHand);
        }

        function advance(dir) {
            if (dir > 0 && TroyBlankCom.scrollVal == TroyBlankCom.scrollValRightLimit()) {
                return;
            }

            if (TroyBlankCom.size == 'desktop' && setPortfolioDisplayIndex(TroyBlankCom.portfolio_display_index + dir)) {
                animateToDisplayIndex(dir);
            }
        }

        function animateToDisplayIndex(dir) {
            var oldScrollVal = TroyBlankCom.scrollVal;
            var targ = $($('#portfolioCarousel > a')[TroyBlankCom.portfolio_display_index]);
            if (targ.length > 0) {
                TroyBlankCom.setScrollVal((-$(targ).position().left) + TroyBlankCom.SCROLL_PADDING);
                TroyBlankCom.updateNavigationArrows();

                //check for animation space, if none reset display index
                if (oldScrollVal != TroyBlankCom.scrollVal) {
                    $('#portfolioCarousel').stop().animate({
                        'left': TroyBlankCom.scrollVal
                    }, 200);
                } else {
                    setPortfolioDisplayIndex(TroyBlankCom.portfolio_display_index - dir);
                }
            }
        }

        this.updateNavigationArrows = function() {
            //left arrow
            if (TroyBlankCom.portfolio_display_index <= 0) {
                turnOffNav($('#content-wrapper .nav-left'));
            } else if ($('#content-wrapper .nav-left').css('opacity') < 1) {
                turnOnNav($('#content-wrapper .nav-left'));
            }

            //right arrow
            if (TroyBlankCom.scrollVal == TroyBlankCom.scrollValRightLimit()) {
                turnOffNav($('#content-wrapper .nav-right'));
            } else {
                turnOnNav($('#content-wrapper .nav-right'));
            }
        }

        function turnOnNav(targ) {
            $(targ).css('display', 'block');
            $(targ).stop().animate({
                'opacity': 1
            }, 200);
        }

        function turnOffNav(targ) {
            $(targ).stop().animate({
                'opacity': 0
            }, 200, function() {
                $(this).css('display', 'none');
            });
        }

        //PORTFOLIO DISPLAY INDEX *********************************************************************
        this.portfolioDisplayIndexCheck = function() {
            var newDisplayIndex = null;

            if (TroyBlankCom.size == 'desktop') {
                newDisplayIndex = Math.round(TroyBlankCom.scrollVal * -1 / TroyBlankCom.portfolioThumbWidth);
            } else {
                newDisplayIndex = Math.round(($(window).scrollTop() - $('header').height()) / $('#portfolioCarousel > a').height());
            }

            setPortfolioDisplayIndex(newDisplayIndex);
        }

        function setPortfolioDisplayIndex(newDisplayIndex) {
            if (newDisplayIndex < 0) {
                newDisplayIndex = 0;
            }

            if (newDisplayIndex != TroyBlankCom.portfolio_display_index) {
                TroyBlankCom.portfolio_display_index = newDisplayIndex;
                preloadPortfolioThumbs.checkPreloadPortfolioThumbs();

                return true;
            }

            return false;
        }

        //PORTFOLIO CANVAS
        function showPortfolioCanvas(portfolioTarg) {
            TroyBlankCom.changeSection('portfolio');

            removeListeners();
            new sectionCanvas($(portfolioTarg).attr('data-link'), '#portfolioCanvas');
        }

        //HANDLERS
        function onhashNavChange(data) {
            if (data.section == 'portfolio') {
                showPortfolioCanvas(data.targ);
            }
        }

        function portfolioClickHand() {
            TroyBlankCom.dispatchEvent(TroyBlankCom.NAV_INTERACTION_MADE);
            showPortfolioCanvas(this);
        }

        function onMouseWheel(e, delta, deltaX, deltaY) {
            if (TroyBlankCom.size == 'desktop') {
                TroyBlankCom.setScrollVal(Math.round(delta * SCROLL_MULTIPLIER) + TroyBlankCom.scrollVal);
                $('#portfolioCarousel').css('left', TroyBlankCom.scrollVal);

                TroyBlankCom.portfolioDisplayIndexCheck();
                TroyBlankCom.updateNavigationArrows();
            }
        }

        function scrollHand() {
            if (TroyBlankCom.size == 'mobile') {
                TroyBlankCom.portfolioDisplayIndexCheck();
            }
        }

        function keydownHand(e) {
            if (e.keyCode == 37) {
                //left
                advance(-1);
            } else if (e.keyCode == 39) {
                //right
                advance(1);
            } else if (e.keyCode == 13) {
                //enter
                showPortfolioCanvas($('#portfolioCarousel > a')[TroyBlankCom.portfolio_display_index]);
            }
        }

        function navClickHand() {
            if ($($(this).parent()).hasClass('nav-right')) {
                advance(1);
            } else {
                advance(-1);
            }
        }

        function onSectionChangeHand() {
            if (TroyBlankCom.section == 'main') {
                refreshListeners();
            } else {
                removeListeners();
            }
        }

        init();
    }

    //LAYOUT ************************************************************************************
    this.determineSize = function() {
        if ($(window).width() > 600 && $(window).height() > 600) {
            this.size = 'desktop';
        } else {
            this.size = 'mobile';
        }
    }

    this.determineDevice = function() {
        if (screen.width > 600 && screen.height > 600) {
            this.device = 'desktop';
        } else {
            this.device = 'mobile';
        }
    }

    this.resizeDom = function() {
        var windowW = $(window).width();
        var windowH = $(window).height();
        var headerH = $('header').outerHeight();

        if (TroyBlankCom.size == 'desktop') {
            //content wrapper
            $('#content-wrapper').width(windowW);
            $('#content-wrapper').height(windowH - headerH);
            $('#content-wrapper').css('top', headerH);

            //portfolio carousel
            $('#portfolioCarousel').css('display', 'block');
            var portfolioThumbWidth = Math.floor(windowW * PORTFOLIO_CARD_RATIO);
            var portfolioThumbHeight = Math.floor(windowH * PORTFOLIO_CARD_RATIO);
            $('#portfolioCarousel > a').width(portfolioThumbWidth);
            $('#portfolioCarousel > a').height(portfolioThumbHeight);

            TroyBlankCom.portfolioThumbWidth = $('#portfolioCarousel > a').outerWidth(true);

            $('#portfolioCarousel').width(TroyBlankCom.portfolioThumbWidth * $('#portfolioCarousel > a').length);
            $('#portfolioCarousel').css('top', Math.floor((windowH - headerH) / 2 - $('#portfolioCarousel > a').outerHeight() / 2));

            //backing
            var backingRect = TROYBLANK_UTILS.scaleWithAspectRatio(new TROYBLANK_UTILS.Rectangle(0, 0, 1024, 768),
                new TROYBLANK_UTILS.Rectangle(0, 0, windowW, windowH), true);
            $('body').css('background-size', Math.ceil(backingRect.width) + 'px ' + Math.ceil(backingRect.height) + 'px');

            if (TroyBlankCom.oldPortfolioThumbWidth != null) {

                //change scroll val based on new thumb size
                var changeRatio = portfolioThumbWidth / TroyBlankCom.oldPortfolioThumbWidth;
                TroyBlankCom.setScrollVal(TroyBlankCom.scrollVal * changeRatio);
                $('#portfolioCarousel').css('left', TroyBlankCom.scrollVal);

                TroyBlankCom.portfolioDisplayIndexCheck();
                TroyBlankCom.updateNavigationArrows();
            }

            TroyBlankCom.oldPortfolioThumbWidth = portfolioThumbWidth;

        } else {
            //mobile

            //content wrapper
            $('#content-wrapper').width('100%');
            $('#content-wrapper').css('height', 'inherit');

            //portfolio carousel
            $('#portfolioCarousel > a').width('100%');
            $('#portfolioCarousel > a').height(200);
            $('#portfolioCarousel').width('100%');

            //hide main section if sub section is open
            if (this.section != 'main') {
                $('#portfolioCarousel').css('display', 'none');
            }
        }
    }

    //HANDLERS ************************************************************************************
    function resizeHand() {
        var rand = String(Math.random());
        TroyBlankCom.determineSize();
        TroyBlankCom.resizeDom();
        TroyBlankCom.dispatchEvent(TroyBlankCom.ON_RESIZE);
    }

    function sectionChangeHand() {
        if (TroyBlankCom.section != 'mainNavContent') {
            this.currentMainNavSectionCanvas = null;
            TroyBlankCom.removeMainNavActives();
        }
    }

    function scrollHand() {
        TroyBlankCom.adjustMobileScrollButtons();
    }

    function homeClickHandler() {
        TroyBlankCom.dispatchEvent(TroyBlankCom.NAV_INTERACTION_MADE);
        goHomeAction();
    }

    function goHomeAction() {
        if (!TroyBlankCom.standAlone) {
            TroyBlankCom.changeSection('main');
        } else {
            window.location.href = '/';
        }
    }

    function mainNavClick() {
        if (!$(this).hasClass('active')) {
            TroyBlankCom.dispatchEvent(TroyBlankCom.NAV_INTERACTION_MADE);
            showMainNavCanvas(this);
        }
    }

    function showMainNavCanvas(targ) {
        if (!$(targ).hasClass('active')) {
            TroyBlankCom.removeMainNavActives();
            $(targ).addClass('active');
            showMainNavContent($(targ).attr('data-href'));
        }
    }

    function onhashNavChange(data) {
        if (data.section == 'mainNavContent') {
            showMainNavCanvas(data.targ);
        } else if (data.section == 'main') {
            goHomeAction();
        }
    }


    //PRELOAD PORTFOLIO THUMBS
    //---------------------------------------------------------------------------------------------
    var preloader_count = 0;

    var AMOUNTOF_PORTTHUMBS_EXTRA_ATATIME = 3;

    var preloadPortfolioThumbs = new function() {
        var thumbPreloaders = new Array();
        var loading = false;
        var timer = null;

        var TICK_SPEED = 33;

        this.checkPreloadPortfolioThumbs = function() {
            if (!TroyBlankCom.done_loadingThumbs) {
                addPreloadGraphics();
            }
        }

        function addPreloadGraphics() {
            var amountOfScreenThumbs = determineAmountOfScreenThumbs();

            for (var i = TroyBlankCom.portfolio_display_index; i < TroyBlankCom.portfolio_display_index + AMOUNTOF_PORTTHUMBS_EXTRA_ATATIME + amountOfScreenThumbs; i++) {
                var targ = $($('#portfolioCarousel > a')[i]);
                if (targ.attr('data-loaded') == 'false') {
                    targ.attr('data-loaded', 'pending');
                    targ.prepend('<div id="preloader_' + preloader_count + '" class="atomic-preloader" />');
                    var aP = new atomicPreloader('preloader_' + preloader_count, false);
                    preloader_count++;
                    thumbPreloaders.push({
                        'preloader': aP,
                        'ele': targ
                    });
                }
            }

            checkToStartLoading();
        }

        function determineAmountOfScreenThumbs() {
            if (TroyBlankCom.size == 'desktop') {
                return (Math.ceil($('#portfolioCarousel > a').width() / $(window).width()));
            } else {
                return (Math.ceil($('#portfolioCarousel > a').height() / $(window).height()) * 2);
            }
        }

        function checkToStartLoading() {
            if (thumbPreloaders.length > 0 && !loading) {
                loading = true;

                var imageSRC = TroyBlankCom.device == 'desktop' ? $(thumbPreloaders[0]['ele']).attr('data-image') : $(thumbPreloaders[0]['ele']).attr('data-image-mobile');

                TROYBLANK_UTILS.loadImage(imageSRC, imageLoadHand);
                loopTimer();
            }
        }

        function loopTimer() {
            timer = setTimeout(tickHand, TICK_SPEED);
        }

        function calcAnimationPoint(index) {
            thumbPreloaders[0]['preloader']['dot' + index + 'A'] += thumbPreloaders[0]['preloader'].vel;
            return TROYBLANK_UTILS.getElipticalMovementPoint(thumbPreloaders[0]['preloader'].centerX, thumbPreloaders[0]['preloader'].centerY,
                thumbPreloaders[0]['preloader'].radiusX, thumbPreloaders[0]['preloader'].radiusY, thumbPreloaders[0]['preloader']['dot' + index + 'A'], thumbPreloaders[0]['preloader']['ellipseAngle' + index]);
        }

        //HANDLERS ************************************************************************************
        function imageLoadHand(e) {
            if (e.status == 404) {
                throw new Error('Image ' + e.url + ' could not be loaded.');
            }

            thumbPreloaders[0]['preloader'].destroy();
            $(thumbPreloaders[0]['ele']).attr('data-loaded', 'true');
            $('.atomic-preloader', thumbPreloaders[0]['ele']).remove();
            var title = $('h1', thumbPreloaders[0]['ele']).html();
            var imageSRC = TroyBlankCom.device == 'desktop' ? $(thumbPreloaders[0]['ele']).attr('data-image') : $(thumbPreloaders[0]['ele']).attr('data-image-mobile');
            $(thumbPreloaders[0]['ele']).prepend('<img src="' + imageSRC + '" alt="' + title + '" class="centerer-crop" />');
            $(thumbPreloaders[0]['ele']).removeAttr('data-image');

            ImageCenterer.centerImage($('img', thumbPreloaders[0]['ele']));

            thumbPreloaders.splice(0, 1);

            if (thumbPreloaders.length > 0) {
                loading = false;
                checkToStartLoading();
            } else {
                loading = false;
                checkForDoneLoading();
            }
        }

        function checkForDoneLoading() {
            if ($('#portfolioCarousel > a[data-loaded=false]').length <= 0) {
                TroyBlankCom.done_loadingThumbs = true;
            }
        }

        function tickHand() {
            var i = thumbPreloaders.length - 1;
            var p1 = null
            var p2 = null;
            var p3 = null;
            while (i >= 0) {
                if (i == thumbPreloaders.length - 1) {
                    p1 = calcAnimationPoint(1);
                    p2 = calcAnimationPoint(2);
                    p3 = calcAnimationPoint(3);
                }
                thumbPreloaders[i]['preloader'].animate(p1, p2, p3);
                i--;
            }

            loopTimer();
        }
    }
}

$(document).ready(TroyBlankCom.init);

//-------------------------------------------------------------------------------------------------
//UTILS
//-------------------------------------------------------------------------------------------------
var TROYBLANK_UTILS = new function() {

    this.getElipticalMovementPoint = function(centerX, centerY, radiusX, radiusY, angle, ellipseAngle) {
        ellipseAngle = ellipseAngle == undefined ? 0 : ellipseAngle;

        if (ellipseAngle != undefined) {
            angleX = Math.cos(angle) * radiusX;
            angleY = Math.sin(angle) * radiusY;
            scaledRadius = Math.sqrt(angleX * angleX + angleY * angleY);
            scaledAngle = Math.atan2(angleY, angleX) + ellipseAngle;
            return new this.Point(centerX + Math.cos(scaledAngle) * scaledRadius, centerY + Math.sin(scaledAngle) * scaledRadius);
        }

        //normal ellipse
        return new this.Point(centerX + Math.cos(angle) * radiusX, centerY + Math.sin(angle) * radiusY);
    }

    this.getMouseCords = function(e, target) {
        var scaleRatioW = $(target).attr("width") / $(target).width();
        var scaleRatioH = $(target).attr("height") / $(target).height();

        var x;
        var y;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        x -= $(target).offset().left;
        y -= $(target).offset().top;

        if (scaleRatioW > 0) {
            x = Math.round(x * scaleRatioW);
            y = Math.round(y * scaleRatioH);
        }

        return new this.Point(x, y);
    }

    this.Point = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.Rectangle = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    this.loadImage = function(src, handler) {
        var img = new Image();
        $(img).error(function() {
            handler({
                'status': 404,
                'url': src
            });
        });
        $(img).load(handler);
        img.src = src;
    }

    this.scaleWithAspectRatio = function(sourceRect, targetRect, crop) {
        if (crop) {
            sourceRect = TROYBLANK_UTILS.scaleWithAspectRatio(sourceRect, targetRect);
        }

        var resultRect = new TROYBLANK_UTILS.Rectangle();
        var widthDiff = (targetRect.width - sourceRect.width);
        var heightDiff = (targetRect.height - sourceRect.height);

        if (crop) {
            var tWD = widthDiff;
            widthDiff = heightDiff;
            heightDiff = tWD;
        }

        if (widthDiff < heightDiff) {
            resultRect.width = targetRect.width;
            resultRect.height = (targetRect.width / sourceRect.width) * sourceRect.height;
            resultRect.x = targetRect.x;
            resultRect.y = (targetRect.height - resultRect.height) / 2
        } else {
            resultRect.height = targetRect.height;
            resultRect.width = (targetRect.height / sourceRect.height) * sourceRect.width;
            resultRect.x = (targetRect.width - resultRect.width) / 2;
            resultRect.y = targetRect.y;
        }

        return resultRect;
    }

    this.readSessionCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
}

$(document).ready(atomicPreloader.init);

//----------------------------------------------------
//IMAGE CENTERER
//----------------------------------------------------
var ImageCenterer = new function() {
    //requires jquery
    //anything with the below classes gets the treatment
    //
    //class refrence
    //CENTER_CROP_CLASS crops to parent and centers


    this.CENTER_CROP_CLASS = 'centerer-crop';

    this.init = function() {
        this.addListeners();
        this.centerImages();
    }

    this.centerImages = function() {
        var root = this;
        $('.' + this.CENTER_CROP_CLASS + ':visible').each(function(i, ele) {
            root.centerImage($(ele));
        });
    }

    this.centerImage = function(targ) {
        if ($(targ).length >= 1) {
            var dim = $(targ).getHiddenDimensions();
            var pDim = $(targ).parent().getHiddenDimensions();

            var targetRect = new TROYBLANK_UTILS.Rectangle(0, 0, dim.outerWidth, dim.outerHeight);
            var sourceRect = new TROYBLANK_UTILS.Rectangle(0, 0, pDim.outerWidth, pDim.outerHeight);

            var resultRect;

            if ($(targ).hasClass(this.CENTER_CROP_CLASS)) {
                resultRect = TROYBLANK_UTILS.scaleWithAspectRatio(targetRect, sourceRect, true);
            }

            if (resultRect != undefined) {
                $(targ).css('margin-top', resultRect.y);
                $(targ).css('margin-left', resultRect.x);
                $(targ).css('width', resultRect.width);
                $(targ).css('height', resultRect.height);
            }
        }
    }

    this.addListeners = function() {
        $(window).resize(this.windowResizeHand);
        $(window).focus(this.windowResizeHand);
    }

    //handlers
    var root = this;

    this.windowResizeHand = function() {
        root.centerImages();
    }
}

$(document).ready(ImageCenterer.init());

//-------------------------------------------------------------------------------------------------
//ATOMIC PRELOADER
//-------------------------------------------------------------------------------------------------
function atomicPreloader(id, selfTimed) {

    var root = this;
    var id = id;
    var selfTimed = selfTimed == undefined ? true : selfTimed;
    var timer = null;

    var paper = null;
    this.dot1;
    this.dot2;
    this.dot3;

    this.centerX = 28;
    this.centerY = 33;
    this.radiusX = 12;
    this.radiusY = 28;
    this.vel = 0.15;
    this.dot1A = 4.70;
    this.dot2A = 1.6;
    this.dot3A = 4.70;
    this.ellipseAngle1 = 0;
    this.ellipseAngle2 = 1.0471975511965976
    this.ellipseAngle3 = 2.0943951023931953

    var TICK_SPEED = 33;

    this.init = function() {
        paper = Raphael(id, 65, 65);
        drawBacking();
        drawBalls();
        calcNewBallsPos();

        if (selfTimed) {
            loopTimer();
        }
    }

    this.animate = function(p1, p2, p3) {
        root.dot1.transform('t' + p1.x + ',' + p1.y);
        root.dot2.transform('t' + p2.x + ',' + p2.y);
        root.dot3.transform('t' + p3.x + ',' + p3.y);
    }

    this.destroy = function() {
        clearTimeout(timer);
    }

    function calcNewBallsPos() {
        calcNewBallPos(1);
        calcNewBallPos(2);
        calcNewBallPos(3);
    }

    function calcNewBallPos(index) {
        root['dot' + index + 'A'] += root.vel;
        var p = TROYBLANK_UTILS.getElipticalMovementPoint(root.centerX, root.centerY,
            root.radiusX, root.radiusY, root['dot' + index + 'A'], root['ellipseAngle' + index]);
        root['dot' + index].transform('t' + p.x + ',' + p.y);
    }

    //timer
    function loopTimer() {
        timer = setTimeout(tickHand, TICK_SPEED);
    }

    //drawling
    function drawBacking() {
        var centerDot = paper.circle(root.centerX, root.centerY, 4);
        centerDot.attr({
            fill: '#ff0000',
            'stroke-width': 0
        });
        var ellipse1 = paper.ellipse(root.centerX, root.centerY, root.radiusX, root.radiusY);
        ellipse1.attr({
            stroke: '#ff0000',
            'stroke-width': 2
        });
        var ellipse2 = paper.ellipse(root.centerX, root.centerY, root.radiusX, root.radiusY);
        ellipse2.attr({
            stroke: '#ff0000',
            'stroke-width': 2
        });
        ellipse2.transform("r60");
        var ellipse3 = paper.ellipse(root.centerX, root.centerY, root.radiusX, root.radiusY);
        ellipse3.attr({
            stroke: '#ff0000',
            'stroke-width': 2
        });
        ellipse3.transform("r-60");
    }

    function drawBalls() {
        root.dot1 = paper.circle(0, 0, 2.5);
        root.dot1.attr({
            fill: '#ff0000',
            'stroke-width': 0
        });
        root.dot2 = paper.circle(0, 0, 2.5);
        root.dot2.attr({
            fill: '#ff0000',
            'stroke-width': 0
        });
        root.dot3 = paper.circle(0, 0, 2.5);
        root.dot3.attr({
            fill: '#ff0000',
            'stroke-width': 0
        });
    }

    //handlers
    function tickHand(e) {
        calcNewBallsPos();
        loopTimer();
    }

    this.init();
}



//-------------------------------------------------------------------------------------------------
//Scroll Bar
//frame      | Dom Element | container of scrollable components
//choke      | Number      | space at bottom that does not trigger a scrollbar appear
//
//the frame dom element must contain dom elements with the classes mask', 'content', 'scrollBar'
//and 'thumb'
//
//REQUIREMENTS:
//          jQuery 1.7.1 or greater  | http://docs.jquery.com/
//          jQuery-mousewheel 3.0.6  | https://github.com/brandonaaron/jquery-mousewheel
//---------------------------------------------- ---------------------------------------------------
function ScrollBar(frame, choke) {
    this.frame = frame;
    this.choke = choke == undefined ? 0 : choke;

    this.dragging = false;
    this.currentMousePos = null;
    this.lastMousePos = null;
    this.dragTicker = null;

    this.touchY = null;

    this.SCROLL_WHEEL_AMOUNT = 30;
    this.MIN_THUMB_HEIGHT = 20;

    //-------------------------------------------
    //PUBLIC
    //-------------------------------------------
    this.refreshDisplay = function() {

        if (!this.isScrollable()) {
            $('.scrollBar', this.frame).css('display', 'none');
            $('.content', this.frame).css('top', 0);
            this.removeListeners();
        } else {
            this.setStage();
            this.setThumbSize();
            this.constrainThumb();
            this.refreshContentPane();
            this.refreshListeners();
        }
    }

    this.destroy = function() {
        this.removeListeners();
    }
    //-------------------------------------------
    //PRIVATE
    //-------------------------------------------
    this.init = function() {
        this.setStage();
        this.refreshDisplay();
    }

    this.addEventListeners = function() {
        if (this.isScrollable()) {
            $('.thumb', this.frame).on('mousedown', this.thumbDownHand);
            $(this.frame).on('mousemove', this.mouseMoveHand);
            $(window).on('mouseup', this.thumbUpHand);
            $(this.frame).on('mousewheel', this.scrollWheelHand);

            //touch devices
            $(this.frame).on('touchmove', this.touchMoveHand);
            $(this.frame).on('touchend', this.touchEndHand)
        }
    }

    this.removeListeners = function() {
        $('.thumb', this.frame).off('mousedown', this.thumbDownHand);
        $(this.frame).off('mousemove', this.mouseMoveHand);
        $(window).off('mouseup', this.thumbUpHand);
        $(this.frame).off('mousewheel', this.scrollWheelHand);

        //touch devices
        $(this.frame).off('touchmove', this.touchMoveHand);
        $(this.frame).off('touchend', this.touchEndHand)
    }

    this.refreshListeners = function() {
        this.removeListeners();
        this.addEventListeners();
    }

    this.isScrollable = function() {
        return $('.content', this.frame).getHiddenDimensions().outerHeight - this.choke > $('.mask', this.frame).getHiddenDimensions().outerHeight
    }

    //-------------------------------------------
    //THUMB
    //-------------------------------------------
    this.dragAction = function() {
        var y_displacement = this.lastMousePos.y - this.currentMousePos.y;
        $('.thumb', this.frame).css('top', $('.thumb', this.frame).position().top - y_displacement);

        this.constrainThumb();
        this.refreshContentPane();
    }

    this.nudgeThumb = function(amount) {
        $('.thumb', this.frame).css('top', $('.thumb', this.frame).position().top - amount);

        this.constrainThumb();
        this.refreshContentPane();
    }

    this.constrainThumb = function() {
        var bar_y = $('.thumb', this.frame).position().top;
        var bar_height = $('.thumb', this.frame).getHiddenDimensions().outerHeight;
        var track_height = $('.scrollBar', this.frame).getHiddenDimensions().outerHeight;

        if ((bar_y + bar_height) > track_height) {
            //over bounds
            $('.thumb', this.frame).css('top', track_height - bar_height);
        } else if (bar_y < 0) {
            $('.thumb', this.frame).css('top', 0);
        }
    }

    //-------------------------------------------
    //UI
    //-------------------------------------------
    this.setStage = function() {
        if (!this.isScrollable()) {
            $('.scrollBar', this.frame).css('display', 'none');
        } else if (TroyBlankCom.size == 'desktop') {
            $('.scrollBar', this.frame).css('display', 'block');
        }
    }

    this.setThumbSize = function() {
        var contentDisplayRatio = $('.mask', this.frame).getHiddenDimensions().outerHeight / $('.content', this.frame).getHiddenDimensions().outerHeight;
        var barHeight = Math.floor($('.scrollBar', this.frame).getHiddenDimensions().outerHeight * contentDisplayRatio);
        barHeight > this.MIN_THUMB_HEIGHT ? $('.thumb', this.frame).height(barHeight) : $('.thumb', this.frame).height(this.MIN_THUMB_HEIGHT);
    }

    this.refreshContentPane = function() {
        var bar_y = $('.thumb', this.frame).position().top;

        var contentDisplayArea = $('.content', this.frame).outerHeight() - $('.mask', this.frame).getHiddenDimensions().outerHeight;
        var barDisplayArea = $('.scrollBar', this.frame).height() - $('.thumb', this.frame).getHiddenDimensions().outerHeight;
        var moveRatio = contentDisplayArea / barDisplayArea;

        var yPos = bar_y * -1 * moveRatio;
        $('.content', this.frame).css('top', yPos);
    }
    //-------------------------------------------
    //UTIL
    //-------------------------------------------
    this.getMouseCords = function(target, e) {
        var scaleRatioW = $(target).attr("width") / $(target).width();
        var scaleRatioH = $(target).attr("height") / $(target).height();

        var x;
        var y;

        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        x -= $(target).offset().left;
        y -= $(target).offset().top;

        if (scaleRatioW > 0) {
            x = Math.round(x * scaleRatioW);
            y = Math.round(y * scaleRatioH);
        }

        return new TROYBLANK_UTILS.Point(x, y);
    }

    //-------------------------------------------
    //HANDLERS
    //-------------------------------------------
    var root = this;

    this.thumbDownHand = function(e) {
        root.currentMousePos = root.getMouseCords($(root.frame)[0], e);
        root.lastMousePos = root.currentMousePos;
        root.dragging = true;
        e.preventDefault();
    }

    this.mouseMoveHand = function(e) {
        if (root.dragging) {
            root.currentMousePos = root.getMouseCords($(root.frame)[0], e);
            root.dragAction();
            root.lastMousePos = root.currentMousePos;
        }
    }

    this.thumbUpHand = function(e) {
        root.dragging = false;
        clearTimeout(root.dragTicker);
    }

    this.scrollWheelHand = function(e, delta) {
        if (root.isScrollable()) {
            root.nudgeThumb(delta * root.SCROLL_WHEEL_AMOUNT);
            e.preventDefault();
        }
    }

    this.touchMoveHand = function(e) {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        if (this.touchY != null) {
            var touchYDiff = this.touchY - touch.pageY;
            root.nudgeThumb(-touchYDiff);
        }

        this.touchY = touch.pageY;
    }

    this.touchEndHand = function(e) {
        this.touchY = null;
    }

    this.init();

}



//----------------------------------------------------
//GET HIDDEN DIMENSION JQUERY EXTENSION
//----------------------------------------------------
//Optional parameter includeMargin is used when calculating outer dimensions
(function($) {
    $.fn.getHiddenDimensions = function(includeMargin) {
        var $item = this,
            props = {
                position: 'absolute',
                visibility: 'hidden',
                display: 'block'
            },
            dim = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            },
            $hiddenParents = $item.parents().andSelf().not(':visible'),
            includeMargin = (includeMargin == null) ? false : includeMargin;

        var oldProps = [];
        $hiddenParents.each(function() {
            var old = {};

            for (var name in props) {
                old[name] = this.style[name];
                this.style[name] = props[name];
            }

            oldProps.push(old);
        });

        dim.width = $item.width();
        dim.outerWidth = $item.outerWidth(includeMargin);
        dim.innerWidth = $item.innerWidth();
        dim.height = $item.height();
        dim.innerHeight = $item.innerHeight();
        dim.outerHeight = $item.outerHeight(includeMargin);

        $hiddenParents.each(function(i) {
            var old = oldProps[i];
            for (var name in props) {
                this.style[name] = old[name];
            }
        });

        return dim;
    }
}(jQuery));