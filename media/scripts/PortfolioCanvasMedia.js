
function PortfolioCanvasMedia(needsLoading, link){

    var slideIndex = 0;
    var preloader = null;

    var link = link;
    var animating = false;

    var flashRestoreHtml = new Object();

    var FADE_SPEED = 500;

    function init(){
        if(needsLoading){
            addPreloader();
            loadContent();
        }else{
            postLoadInit();
        }

        addPermaListeners();
    }

    function postLoadInit(){
        $($('.portfolio-piece .slideshow .slide')[slideIndex]).css('display', 'block');

        addPagination();
        sizeAllContent();
        addListeners();
        addContent();

        TroyBlankCom.dispatchEvent(TroyBlankCom.ON_SPECIMEN_READY);
    }

    function addPermaListeners(){
        TroyBlankCom.addEventListener(TroyBlankCom.ON_MEDIA_FLUSH_REQUEST, onMediaFlushRequest);
    }

    function addListeners(){
        $('.slideshow > nav a').on('click', slideShowPageClick);

        TroyBlankCom.addEventListener(TroyBlankCom.ON_RESIZE, resizeHand);
    }

    //-------------------------------------------------------------------------------------------------------------------------------------
    //PAGINATION
    //-------------------------------------------------------------------------------------------------------------------------------------
    function addPagination(){
        if($('.slideshow .region .slide').length > 1){
            $('.slideshow > nav').css('display', 'block');
            var i = $('.slideshow .region .slide').length;
            while(i > 0){
                $('.slideshow > nav').prepend('<a>'+i+'</a>');
                i--;
            }

            $($('.slideshow > nav a')[slideIndex]).addClass('active');
        }

        $($('.portfolio-piece .slideshow .slide')[slideIndex]).addClass('active');
    }

    function swapSlide(){
        animating = true;

        //old
        var oldTarg = $($('.portfolio-piece .slideshow .slide')[slideIndex]);
        $(oldTarg).stop().animate({'opacity':0}, FADE_SPEED, function(){
            destroySlide(this);
        });

        //new
        slideIndex = $('.slideshow > nav a.active').index();
        var newTarg = $($('.portfolio-piece .slideshow .slide')[slideIndex]);

        $('.portfolio-piece .slideshow .slide').removeClass('active');
        $(newTarg).addClass('active');

        $(newTarg).css('display', 'block');
        $(newTarg).css('opacity', 0);
        $(newTarg).stop().animate({'opacity':1}, FADE_SPEED, function(){
            animating = false;
        });

        sizeContent($($('.portfolio-piece .slideshow .slide')[slideIndex]), true);

        addContent();
    }

    //-------------------------------------------------------------------------------------------------------------------------------------
    //SLIDE SHOW
    //-------------------------------------------------------------------------------------------------------------------------------------
    function addContent(){
        var targ = $($('.portfolio-piece .slideshow .slide')[slideIndex]);

        switch($(targ).attr('data-type')){
            case 'flash':
                addFlash(targ);
                break;
        }
    }

    function addFlash(targ){
        var divId = $('.flashReplacementDiv', targ).attr('id');
        flashRestoreHtml[divId] = $('.flashContent', targ).html();

        var flashAttrs = new Object();
        flashAttrs["vars"] = {};

        if($(targ).attr('data-flash-vars').length > 0){
            var flashVars = $(targ).attr('data-flash-vars').split(',');
            var i = flashVars.length-1;
            while(i >= 0){
                var flashVar = flashVars[i].split(':');
                flashAttrs["vars"][flashVar[0]] = flashVar[1];
                i--;
            }
        }

        flashAttrs["params"] = {
            bgcolor: "#ffffff",
            wmode: "transparent",
            AllowScriptAccess: "always",
            allowFullScreen: "true",
            menu: "false"
        };

        if($(targ).attr('data-flash-params').length > 0){
            var flashParams = $(targ).attr('data-flash-params').split(',');
            var j = flashParams.length-1;
            while(j >= 0){
                var flashParam = flashParams[j].split(':');
                flashAttrs["params"][flashParam[0]] = flashParam[1];
                j--;
            }
        }

        flashAttrs["attributes"] = {};

        swfobject.embedSWF($(targ).attr('data-src'), divId, $(targ).attr('data-width'), $(targ).attr('data-height'), $(targ).attr('data-version'), "/media/swf/expressInstall.swf", flashAttrs["vars"], flashAttrs["params"], flashAttrs["attributes"]);
    }

    function getSWF(movieName) {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            return window[movieName];
        } else {
            return document[movieName];
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------------------
    //DYNAMIC SIZING
    //-------------------------------------------------------------------------------------------------------------------------------------
    function sizeAllContent(){
        var i = $('.portfolio-piece .slideshow .slide').length-1;
        while(i >= 0){
            sizeContent($('.portfolio-piece .slideshow .slide')[i]);
            i--;
        }
    }

    function sizeContent(targ, animateIt){
        animateIt == animateIt == undefined ? false : true;

        var targ_w = $(targ).attr('data-width');
        var targ_h = $(targ).attr('data-height');

        var cur_w = $('.body').width();

        if(cur_w > targ_w){
            // normal set
            setSlideShowDiminsions(targ, targ_w, targ_h, animateIt);

            if($(targ).hasClass('active') && $(targ).attr('data-resizeable') == 'false'){
                hideResizeError(targ);
            }
        }else{
            setSlideShowDiminsions(targ, cur_w, Math.round(targ_h*cur_w/targ_w), animateIt);

            if($(targ).hasClass('active') && $(targ).attr('data-resizeable') == 'false'){
                showResizeError(targ);
            }
        }

        if($(targ).hasClass('active') && $(targ).attr('data-resizeable') == 'true'){
            hideResizeError(targ);
        }
    }

    function setSlideShowDiminsions(targ, w, h, animateIt){
        var borderWidth = Number($('.slideshow .region').css('border-left-width').split('px')[0])+Number($('.slideshow .region').css('border-right-width').split('px')[0]);


        if(!animateIt){
            if($(targ).hasClass('active')){
                $('.portfolio-piece .slideshow .slide-band').height(Number(h)+borderWidth);
                $('.slideshow .region').width(w);
                $('.slideshow .region').height(h);
                $('.slideshow').width($('.slideshow .region').outerWidth(true));
            }
            $(targ).width(w);
            $(targ).height(h);
        }else{
            $('.slideshow').stop().animate({'width':Number(w)+borderWidth}, FADE_SPEED);
            $('.portfolio-piece .slideshow .slide-band').stop().animate({'height':Number(h)+borderWidth}, FADE_SPEED);
            $('.slideshow .region').stop().animate({'width':w, 'height':h}, FADE_SPEED);

            $(targ).stop().animate({'width':w, 'height':h, 'opacity':1}, FADE_SPEED, function(){
                animating = false;
            });

            if($(targ).hasClass('active') && $(targ).attr('data-resizeable') == 'false'){
                $('.portfolio-piece .slideshow .under-size-error').css('opacity', 0);
                $('.portfolio-piece .slideshow .under-size-error').stop().animate({'opacity':1}, FADE_SPEED);
            }
        }
    }

    function showResizeError(targ){
        $('.portfolio-piece .slideshow .under-size-error').height($($('.portfolio-piece .slideshow .slide')[slideIndex]).height());
        $('.portfolio-piece .slideshow .under-size-error').css('display', 'block');

        $('.flashContent', targ).css('display', 'none');
    }

    function hideResizeError(targ){
        $('.portfolio-piece .slideshow .under-size-error').css('display', 'none');
        $('.flashContent', targ).css('display', 'block');
    }

    //-------------------------------------------------------------------------------------------------------------------------------------
    //DESTROY
    //-------------------------------------------------------------------------------------------------------------------------------------
    function destroy(){
        flashRestoreHtml = new Object()
        
        removePermaListeners();
        removeListeners();
        removePreloader();

        $('#portfolioCanvas .content').empty();
    }

    function destroySlide(targ){
        switch($(targ).attr('data-type')){
            case 'flash':
                destroyFlashSlide(targ);
                break;
        }

        $(targ).css('display', 'none');
    }

    function destroyFlashSlide(targ){
        var flashID = $('object', targ).attr('id');
        var swf = getSWF(flashID);
        if(swf != undefined){
            if(swf.destroy != undefined){
                swf.destroy();
            }
        }

        $('.flashContent', targ).empty();
        $('.flashContent', targ).html(flashRestoreHtml[flashID]);
    }

    function removePermaListeners(){
        TroyBlankCom.removeEventListener(TroyBlankCom.ON_MEDIA_FLUSH_REQUEST, onMediaFlushRequest);
    }

    function removeListeners(){
        TroyBlankCom.removeEventListener(TroyBlankCom.ON_RESIZE, resizeHand);
    }

    //handlers
    function onMediaFlushRequest(){
        destroy();
    }

    function resizeHand(){
        sizeAllContent();
    }

    function slideShowPageClick(){
        if(!$(this).hasClass('active') && !animating){
            $('.slideshow > nav a').removeClass('active');
            $(this).addClass('active');
            swapSlide();
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------------------
    //LOADER
    //-------------------------------------------------------------------------------------------------------------------------------------
    function loadContent(){
        $('#portfolioCanvas .mask').load(link+' .portfolio-piece .content', loadedContentHand);
    }

    function loadedContentHand(){
        removePreloader();
        postLoadInit();
    }

    function addPreloader(){
        $('.portfolio-piece').prepend('<div id="preloader_specimen" class="atomic-preloader" />');
        preloader = new atomicPreloader('preloader_specimen', true);
    }

    function removePreloader(){
        if($('#preloader_specimen').length > 0){
           preloader.destroy(); 
           $('#preloader_specimen').remove();
        }
    }

    init();
}
