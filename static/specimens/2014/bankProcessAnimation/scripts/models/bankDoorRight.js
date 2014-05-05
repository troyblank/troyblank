//left door controls the stops
function BankDoorRight(ele) {

    //var ele = $('g', ele)[0];
    var ele = ele;

    var sx = 1;
    var sv = 0.03;

    //---------------------------------------------------------------------------------------------
    //PUBLIC
    //---------------------------------------------------------------------------------------------

    this.update = function() {
        switch (bankVerificationAnimation.doorState) {
            case 'open':
                openDoor();
                break;
            case 'close':
                closeDoor();
                break;
        }
    }

    //---------------------------------------------------------------------------------------------
    //PRIVATE
    //---------------------------------------------------------------------------------------------

    function openDoor() {
        sx -= sv;
        if (sx <= 0) {
            sx = 0;
        }
        refresh();
    }

    function closeDoor() {
        sx += sv;
        if (sx >= 1) {
            sx = 1;
        }
        refresh();
    }

    function refresh() {
        var cx = $(ele).width();

        //19.3 is a manual calc of the max width of door
        //due to a chrome but with transform only applicable on child svgs this hack is necessary.
        var widthRatio = cx / 19.3;

        $('g', ele).attr('transform', 'matrix(' + sx + ',0,0,1,' + ((cx - sx * cx) / widthRatio) + ',0)');
    }
}