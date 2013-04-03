//-------------------------------------------------------------------------------------------------
//VIDEO PLAYER 0.1
//targ | DOM element | the element that contains the video structure
//
//the structure of the targ must mimic the one in the html example attached with this class.
//
//ffmpeg compression commands:
//webm vp8 / Ogg Vorbis (webkit browsers)
//  ffmpeg -i in.avi -threads 6 -vcodec libvpx -s 520x285 -r 30 -b 1000k -ss 00:00:00 -acodec libvorbis -ab 128k -ar 44100 out.webm
//theora.ogv / Ogg Vorbis (firefox)
//  ffmpeg -i in.avi -threads 6 -vcodec libtheora -s 520x285 -r 30 -b 1000k -ss 00:00:00 -acodec libvorbis -ab 128k -ar 44100 out.ogv
//h264 / AAC (the rest)
//  ffmpeg -i in.avi -threads 6 -vcodec libx264 -s 520x284 -r 30 -b 1000k -ss 00:00:00 -vpre slow -acodec libfaac -ab 128k -ar 44100 out.mp4
//
//ISSUES:
//03-22-2013 Chrome - does not show buffer 'readystate' is always 4
//03-22-2013 Chrome - scrubbing too fast sometimes disconnects video, not sure why (disalbed under IS_BROWER_CHROME check)
//03-25-2013 IE     - requestFullScreen is not supported yet
//03-25-2013 IE     - does not support pointer-events css
//04-03-2013 Safari - requestFullScreen is not supported yet
//04-03-2013 Safari - volume can not be adjusted on iOS
//04-03-2013 Safari - will not play self hosted videos on localhost iOS (test using this video http://video-js.zencoder.com/oceans-clip.mp4)
//
//http://www.w3.org/wiki/HTML/Elements/video
//-------------------------------------------------------------------------------------------------
//http://www.longtailvideo.com/html5/buffering/
//http://stackoverflow.com/questions/11403202/html5-video-waiting-event-not-firing
//http://tiffanybbrown.com/2010/07/05/the-html5-video-progress-event/
function VideoPlayer(targ, autoPlay){

    var targ = targ;

    var video = $('video', targ)[0];
    var html5VideoSupport = !!document.createElement('video').canPlayType;
    var root = this;
    var ticker = null;
    var canPlayThrough = false;

    var video_scrub_dragging = false;
    var audio_scrub_dragging = false;
    var ticker_video_dragging = null;

    this.bufferState = false;

    var DEBUG_MODE = false;
    var REFRESH_RATE = 350;

    var IS_BROWSER_IE = Boolean($.browser.msie);
    var IS_BROWER_SAFARI = navigator.userAgent.toLowerCase().indexOf("safari") > 0;
    var IS_BROWER_CHROME = navigator.userAgent.toLowerCase().indexOf("chrome") > 0;

    function init(){
        addListeners();
        invokeBrowserAcceptions();
    }

    function addListeners(){
        //VIDEO STATUS LISTENERS
        video.addEventListener("playing", videoPlayingHand, false);
        video.addEventListener('progress', videoProgressHand, false);
        video.addEventListener("ended", videoEndedHand, false);
        video.addEventListener('timeupdate', timeUpdateHand, false);
        video.addEventListener('canplaythrough', canPlayThroughHand, false);
        ///video.addEventListener("waiting", videoWaitingHand, false);
        //video.addEventListener("stalled", videoWaitingHand, false);
        //video.addEventListener('suspend', videoSuspendHand, false);

        //UI LISTENERS
        $('.rewind-btn', targ).on('click', onRewindHand);
        $('.play-pause-btn', targ).on('click', onPlayPauseHand);
        $('.full-screen-btn', targ).on('click', onFullScreenHand);
        $('.scrub-bar .load-bar', targ ).on('click', loadBarClickHand);
        $('.scrub-bar .cursor', targ).on('mousedown', videoCursorDownHand);
        $('.scrub-bar', targ).on('mousemove', scrubingVideoMoveHand);
        $('.volume-bar .cursor', targ).on('mousedown', audioCursorDownHand);
        $('.volume-bar', targ).on('mousemove', scrubingAudioMoveHand);
        $('.volume-bar', targ).on('click', volumeBarClickHand);
        $('.big-play-btn', targ).on('click', onBigPlayPauseHand);
        $(window).on('mouseup', cursorUpHand);
    }

    function invokeBrowserAcceptions(){
        if(IS_BROWSER_IE){
            $('.full-screen-btn', targ).css('display', 'none');
            $('.scrub-bar .progress-bar', targ ).on('click', loadBarClickHand);
            $('.control-bar', targ ).css('margin-top', Number($('.control-bar', targ ).css('margin'))-1);

            //style
            $('.scrub-bar .progress-bar', targ ).css('cursor', 'pointer');
        }else if(IS_BROWER_SAFARI){
            $('.full-screen-btn', targ).css('display', 'none');
            $('.volume-bar', targ).css('display', 'none');
        }else if(IS_BROWER_CHROME){
            $('.video-player .control-bar .scrub-bar .cursor').off('mousedown', videoCursorDownHand);
            $('.video-player .control-bar .scrub-bar').off('mousemove', scrubingVideoMoveHand);
        }
    }

    function startTicker(){
        endTicker();
        ticker = setTimeout(tickHand, REFRESH_RATE);
    }

    function endTicker(){
        clearTimeout(ticker);
    }

    function updateDisplay(){
        //BUFFER
        toggleBuffer(isVideoBuffering());

        if(!isNaN(video.duration)){
            var duratationPercent = (video.currentTime/video.duration)*100;
            //var bufferEnd = video.buffered.end(video.buffered.length-1);
            var bufferEnd = video.buffered.end(0);
            var loadPercent = (bufferEnd/video.duration)*100;

            //CONTROL BAR
            $('.video-player .control-bar .scrub-bar .cursor').css('left', String(duratationPercent)+'%');
            $('.video-player .control-bar .scrub-bar .progress-bar').css('width', String(duratationPercent)+'%');

            //if(!canPlayThrough){
                $('.video-player .control-bar .scrub-bar .load-bar').css('width', String(loadPercent)+'%');
            //}else{
                //$('.video-player .control-bar .scrub-bar .load-bar').css('width', '100%');
            //}
        }
    }

    function isVideoBuffering(){
        //0 = HAVE_NOTHING - no information whether or not the audio/video is ready
        //1 = HAVE_METADATA - metadata for the audio/video is ready
        //2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
        //3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
        //4 = HAVE_ENOUGH_DATA - enough data available to start playing
        if(video_scrub_dragging){
            return false;
        }else if(video.readyState >=3 ){
            return false
        }else{
            return true;
        }
    }

    //-----------------------------------------------------------------------------------------
    //VIDEO
    //-----------------------------------------------------------------------------------------
    function setTime(time){
      video.currentTime = time;  
    }

    function rewind(){
        setTime(0);
        updateDisplay();
    }

    function updateTime(){
        if($('.timer', targ).length > 0){
           var seconds = Math.floor(video.currentTime);
           var minutes = Math.floor(seconds/60);
           seconds = seconds - (minutes*60);

           $('.timer span', targ).html(addLeadingZeros(String(minutes), 2)+':'+addLeadingZeros(String(seconds), 2));
        }

        function addLeadingZeros(string, spots){
            if (string.length < spots){
                var zeros = "";
                var amountToFill = spots - string.length;
                for(var i = 0; i<amountToFill; i++){
                    zeros += "0";
                }
                string = zeros+string;
            }
            return string;
        }
    }

    function toggleBuffer(state){
        if(state){
            $('.overlays .buffer', targ).css('display', 'block');
        }else{
            $('.overlays .buffer', targ).css('display', 'none');
        }
        root.bufferState = state;
        dispatchEvent(root.ON_BUFFER_CHANGE);
    }

    function seekToBarClickTime(clickSetTime){
        setTime(clickSetTime);
        updateDisplay();
    }

    /*function swapVideo(){
        $("video")[0].poster = GolfFlyoversUI.VIDEO_POSTERS[GolfFlyoversUI.holeSelected];
        //safari doesn't like all three at once
        $("video")[0].src = "file.mp4";
        if(!isSafari){
            $("video")[0].src = "file.webm";
            $("video")[0].src = "file.ogv"
        }
        //load clears out video
        $("video")[0].load();
    }*/
    //-----------------------------------------------------------------------------------------
    //VOLUME
    //-----------------------------------------------------------------------------------------
    function setVolume(vol){
        video.volume = vol;

        alert(vol+" : "+video.volume);
    }

    function updateVolume(){
        var percent = (video.volume*100)+'%';
        $('.video-player .volume-bar .status-bar').css('width', (video.volume*100)+'%');
        $('.video-player .volume-bar .cursor').css('left', (video.volume*100)+'%');
    }
    //-----------------------------------------------------------------------------------------
    //HANDLERS - VIDEO STATUS
    //-----------------------------------------------------------------------------------------
    function videoPlayingHand(){
        //toggleBuffer(false);
        startTicker();
        logEvent('>>> playing event');
    }
    function videoWaitingHand(){
        //toggleBuffer(true);
        //endTicker();
        logEvent('>>> waiting event');
    }
    function videoSuspendHand(){
        logEvent('>>> suspend event');
    }
    function videoProgressHand(e){
        if(!video.paused){
            updateDisplay();
        }
        logEvent('>>> video progress event');
    }
    function videoEndedHand(){
        endTicker();
        rewind();
        $('.play-pause-btn', targ).removeClass('active');
        logEvent('>>> video stopped');
    }
    function timeUpdateHand(){
        updateTime();
        logEvent('>>> time update event');
    }

    function canPlayHand(){
        logEvent('>>> can play event'); 
    }

    function canPlayThroughHand(){
        canPlayThrough = true;
        toggleBuffer(false);
        logEvent('>>> can play through event'); 
    }

    function logEvent(str){
        if(DEBUG_MODE){
            console.log(str);
        }
    }

    //-----------------------------------------------------------------------------------------
    //HANDLERS
    //-----------------------------------------------------------------------------------------
    function onRewindHand(){
        rewind();
    }

    function onBigPlayPauseHand(){
        $('.big-play-btn', targ).css('display', 'none');
        $('.play-pause-btn', targ).addClass('active');
        video.play();
    }

    function onPlayPauseHand(){
        //active means playing
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            video.pause();
        }else{
            $('.big-play-btn', targ).css('display', 'none');
            $(this).addClass('active');
            video.play();
        }
    }

    function onFullScreenHand(){
        if(video.requestFullScreen){
            video.requestFullScreen();
        }else if(video.mozRequestFullScreen){
            video.mozRequestFullScreen();
        }else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
    }

    function tickHand(){
        updateDisplay();
        startTicker();
    }

    function loadBarClickHand(e){
        var clickSetTime = TROYBLANK_UTILS.getMouseCords(e, $(this)).x/$('.video-player .control-bar .scrub-bar').width()*video.duration;
        seekToBarClickTime(clickSetTime);
    }

    function volumeBarClickHand(e){
        var clickSetVol = TROYBLANK_UTILS.getMouseCords(e, $(this)).x/$('.video-player .control-bar .volume-bar').width();
        setVolume(clickSetVol);
        updateVolume();
    }

    function videoCursorDownHand(){
        video_scrub_dragging = true;
        return false;
    }

    function audioCursorDownHand(e){
        audio_scrub_dragging = true;
        return false;
    }

    function cursorUpHand(){
        if(video_scrub_dragging){
            video_scrub_dragging = false;
        }
        if(audio_scrub_dragging){
            audio_scrub_dragging = false;
        }
    }

    function scrubingVideoMoveHand(e){
        if(video_scrub_dragging){
            var xVal = TROYBLANK_UTILS.getMouseCords(e, $(this)).x;
            if(xVal > $('.video-player .control-bar .scrub-bar .load-bar').width()){
                xVal = $('.video-player .control-bar .scrub-bar .load-bar').width();
            }

            var clickSetTime = xVal/$('.video-player .control-bar .scrub-bar').width()*video.duration;
            seekToBarClickTime(clickSetTime);
        }
    }

    function scrubingAudioMoveHand(e){
        if(audio_scrub_dragging){
            var clickSetVol = TROYBLANK_UTILS.getMouseCords(e, $(this)).x/$('.video-player .control-bar .volume-bar').width();
            setVolume(clickSetVol);
            updateVolume();
        }
    }
    //-----------------------------------------------------------------------------------------
    //DISTRUCTION
    //-----------------------------------------------------------------------------------------
    this.destroy = function(){
        endTicker();
        removeListeners();
        killVideo();
        resetDisplay();
    }

    function killVideo(){
        video.pause();
        setTime(0);
    }

    function resetDisplay(){
        toggleBuffer(false);
        $('.big-play-btn', targ).css('display', 'block');
        $('.play-pause-btn', targ).removeClass('active');

        //CONTROL BAR
        $('.video-player .control-bar .scrub-bar .cursor').css('left', '0%');
        $('.video-player .control-bar .scrub-bar .progress-bar').css('width', '0%');
        $('.video-player .control-bar .scrub-bar .load-bar').css('width', '0%');
    }

    function removeListeners(){
        //VIDEO STATUS LISTENERS
        video.removeEventListener("playing", videoPlayingHand, false);
        video.removeEventListener('progress', videoProgressHand, false);
        video.removeEventListener("ended", videoEndedHand, false);
        video.removeEventListener('timeupdate', timeUpdateHand, false);
        video.removeEventListener('canplaythrough', canPlayThroughHand, false);

        //UI LISTENERS
        $('.rewind-btn', targ).off('click', onRewindHand);
        $('.play-pause-btn', targ).off('click', onPlayPauseHand);
        $('.full-screen-btn', targ).off('click', onFullScreenHand);
        $('.scrub-bar .load-bar', targ ).off('click', loadBarClickHand);
        $('.scrub-bar .cursor', targ).off('mousedown', videoCursorDownHand);
        $('.scrub-bar', targ).off('mousemove', scrubingVideoMoveHand);
        $('.volume-bar .cursor', targ).off('mousedown', audioCursorDownHand);
        $('.volume-bar', targ).off('mousemove', scrubingAudioMoveHand);
        $('.volume-bar', targ).off('click', volumeBarClickHand);
        $('.big-play-btn', targ).off('click', onBigPlayPauseHand);
        $(window).off('mouseup', cursorUpHand);
    }
    //-----------------------------------------------------------------------------------------
    //DISPATCHER
    //-----------------------------------------------------------------------------------------
    var eventDispatcher = new Object();
    this.ON_BUFFER_CHANGE = 'onBufferChange';

    this.addEventListener = function(type, handler){
        if(eventDispatcher[type] == undefined){
           eventDispatcher[type] = new Array();
        }
        eventDispatcher[type].push(handler);
    }
    this.removeEventListener = function (type, handler){
        var i = eventDispatcher[type].length-1;
        while(i >= 0){
            if(eventDispatcher[type][i] == handler){
                eventDispatcher[type].splice(i, 1);
                return;
            }
            i--;
        }
    }
    function dispatchEvent(type){
        if(eventDispatcher[type] != undefined){
            var callList = eventDispatcher[type].slice(0);
            for(var i = 0; i<callList.length; i++){
                callList[i].call(this, {'target':root, 'display':targ});
            }
        }
    }

    init();
}