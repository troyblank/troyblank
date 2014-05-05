function CheckMark(ele) {

    var ele = ele;

    var a;
    var s;

    var animTick = 0;

    var SHORT_DURATION = 40;
    var LONG_DURATION = 60;

    //---------------------------------------------------------------------------------------------
    //PUBLIC
    //---------------------------------------------------------------------------------------------

    this.update = function() {
        switch (bankVerificationAnimation.checkState) {
            case 'show':
                showCheck();
                break;
            case 'hide':
                hideCheck();
                break;
        }
    }

    //---------------------------------------------------------------------------------------------
    //PRIVATE
    //---------------------------------------------------------------------------------------------

    function showCheck() {
        animTick++;

        a = AnimUtil.easeInQuad(animTick, 0.5, 1, SHORT_DURATION);
        s = AnimUtil.easeOutElastic(animTick, 0, 100, LONG_DURATION);

        if (a >= 1) {
            a = 1;
        }

        if (animTick == LONG_DURATION) {
            animTick = 0;
            bankVerificationAnimation.checkState = 'stop';
        }

        refresh();
    }

    function hideCheck() {
        animTick++;

        a = AnimUtil.easeInQuad(animTick, 1, -1, SHORT_DURATION / 2);
        s = AnimUtil.easeInQuad(animTick, 100, -120, LONG_DURATION / 2);

        if (a <= 0) {
            a = 0;
        }

        if (animTick == LONG_DURATION) {
            animTick = 0;
            bankVerificationAnimation.checkState = 'stop';
        }

        refresh();
    }

    function refresh() {
        $(ele).css('display', 'block');
        $(ele).css('opacity', a);
        $('svg', ele).css('width', s + '%');
        $('svg', ele).css('height', s + '%');

        var margin = -Math.round(s / 2);
        $('svg', ele).css('margin', margin + '% 0 0 ' + margin + '%');
    }
}