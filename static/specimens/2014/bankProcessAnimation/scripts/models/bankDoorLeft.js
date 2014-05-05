function BankDoorLeft(ele) {

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
            bankVerificationAnimation.doorState = 'stop';
        }
        refresh();
    }

    function closeDoor() {
        sx += sv;
        if (sx >= 1) {
            sx = 1;
            bankVerificationAnimation.doorState = 'stop';
        }
        refresh();
    }

    function refresh() {
        $('g', ele).attr('transform', 'scale(' + sx + ' 1)');
    }
}