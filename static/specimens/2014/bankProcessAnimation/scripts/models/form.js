function Form(ele) {

    var ele = ele;

    var y = 110;

    var restingPoint = 15;
    var endPoint = -75;

    var inputTick = 0;
    var cursor = $('#cursor');
    var currentInput = $('.input-line', ele)[0];

    var transmitTick = 0;
    var isTransmitStageSet = false;
    var transmitCount = 0;
    var nodes = [];
    var MAX_NODE_CYCLES = 3;
    var cursorTarget = -50;
    var doorTarget = 130;
    var transmitDuration = 50;
    var transmitBrowserToBank = true;

    var moveOutTick = 0;
    var moveOutStart = null;

    var moveInTick = 0;
    var moveInStart = null;

    //---------------------------------------------------------------------------------------------
    //PUBLIC
    //---------------------------------------------------------------------------------------------

    this.update = function() {
        switch (bankVerificationAnimation.formState) {
            case 'entering':
                moveIn();
                break;
            case 'leaving':
                moveOut();
                break;
        }

        switch (bankVerificationAnimation.inputState) {
            case 'writting':
                writeInputs();
                break;
            case 'transmitting':
                transmitStageSet();
                transmitting();
                break;
        }
    }

    this.destroy = function() {
        y = 110;
        vy = 3;
        ay = 0;

        inputTick = 0;
        transmitTick = 0;
        transmitCount = 0;
        transmitBrowserToBank = true;

        moveOutTick = 0;
        moveOutStart = null;

        moveInTick = 0;
        moveInStart = null;

        $(cursor).removeAttr('style');
        $(ele).removeAttr('style');
        $('.input-line', ele).removeAttr('style');
        currentInput = $('.input-line', ele)[0];
    }

    //---------------------------------------------------------------------------------------------
    //PRIVATE
    //---------------------------------------------------------------------------------------------

    function transmitting() {
        transmitTick++;

        //cursor blink
        if (transmitTick % 10 > 5) {
            $(cursor).hide();
        } else {
            $(cursor).show();
        }

        var tt = transmitTick;
        if (tt == 5 | tt == 15 | tt == 25 | tt == 35 | tt == 45 | tt == 55 | tt == 65 | tt == 75 | tt == 85 || tt == 95) {
            addTransmitNode();
        }

        if (transmitTick == 165 || ((transmitCount + 1) == MAX_NODE_CYCLES && transmitTick == 150)) {
            //node cycle animation done
            transmitCycleEndHand();
        } else {
            updateNodes()
        }
    }

    function updateNodes() {
        var startTarget = transmitBrowserToBank ? cursorTarget : doorTarget;
        var endTarget = transmitBrowserToBank ? doorTarget + Math.abs(cursorTarget) : cursorTarget - doorTarget;
        var radiusGrow = transmitBrowserToBank ? 0.1 : 0.28;
        var radiusShrink = transmitBrowserToBank ? 0.2 : 0.155;

        var i = nodes.length - 1;
        while (i >= 0) {
            var node = nodes[i];

            node.time += 1;

            if (node.time <= 50) {
                node.x = AnimUtil.easeInOutQuad(node.time, startTarget, endTarget, transmitDuration);

                if (node.time <= transmitDuration / 2) {
                    node.r += radiusGrow;
                } else {
                    node.r -= radiusShrink;
                }

                node.ele.setAttribute('cx', node.x);
                node.ele.setAttribute('r', node.r);
            } else {
                $(node.ele).hide();
            }

            i--;
        }
    }

    function addTransmitNode() {

        //TRANSMIT
        //+++++++++++++++++++++++++++++++++++++++++++++

        var startTarget = transmitBrowserToBank ? cursorTarget : doorTarget;
        var radius = transmitBrowserToBank ? 3 : 0.1;

        var node = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        node.setAttribute('r', radius);
        node.setAttribute('cx', startTarget);
        node.setAttribute('cy', 46.5);
        node.setAttribute('fill', '#3A94F3');

        nodes.push({
            'ele': node,
            'time': 0,
            'r': radius,
            'x': -50
        });
        $('#transmiter').append(node);
    }

    function transmitCycleEndHand() {
        $('#transmiter').empty();
        transmitCount++;
        nodes = [];

        if (transmitCount < MAX_NODE_CYCLES) {
            transmitTick = 0;
            if (transmitBrowserToBank) {
                transmitBrowserToBank = false;
            } else {
                transmitBrowserToBank = true;
            }
        } else {
            bankVerificationAnimation.inputState = 'stop';
            transmitStageDestroy();
        }
    }

    function transmitStageSet() {
        if (!isTransmitStageSet) {
            $('.browser .pane').css('overflow', 'visible');
            isTransmitStageSet = true;
        }
    }

    function transmitStageDestroy() {
        $('.browser .pane').css('overflow', 'hidden');
        isTransmitStageSet = false;
    }

    //INPUTS
    //+++++++++++++++++++++++++++++++++++++++++++++

    function writeInputs() {
        inputTick++;

        switch (inputTick) {
            case 1:
                $(cursor).hide();
                break;
            case 5:
                $(cursor).show();
                $(cursor).css('left', '20%');
                $(currentInput).css('width', '5%');
                break;
            case 10:
                $(cursor).css('left', '25%');
                $(currentInput).css('width', '10%');
                break;
            case 20:
                $(cursor).css('left', '30%');
                $(currentInput).css('width', '15%');
                break;
            case 22:
                $(cursor).css('left', '35%');
                $(currentInput).css('width', '20%');
                break;
            case 25:
                $(cursor).css('left', '40%');
                $(currentInput).css('width', '25%');
                break;
            case 30:
                $(cursor).css('left', '45%');
                $(currentInput).css('width', '30%');
                break;
            case 33:
                $(cursor).css('left', '50%');
                $(currentInput).css('width', '35%');
                break;
            case 36:
                $(cursor).css('left', '55%');
                $(currentInput).css('width', '40%');
                break;
            case 40:
                $(cursor).css('left', '60%');
                $(currentInput).css('width', '45%');
                break;
            case 50:
                $(cursor).css('left', '65%');
                $(currentInput).css('width', '50%');
                break;
                //line2-----------------------------------------
            case 55:
                currentInput = $('.input-line', ele)[1];
                $(cursor).css('left', '15%');
                $(cursor).css('top', '35%');
                break;
            case 60:
                $(cursor).hide();
                break;
            case 65:
                $(cursor).show();
                break;
            case 70:
                $(cursor).hide();
                break;
            case 75:
                $(cursor).show();
                $(cursor).css('left', '20%')
                $(currentInput).css('width', '5%');
                break;
            case 80:
                $(cursor).css('left', '25%')
                $(currentInput).css('width', '10%');
                break;
            case 85:
                $(cursor).css('left', '30%')
                $(currentInput).css('width', '15%');
                break;
            case 90:
                $(cursor).css('left', '35%')
                $(currentInput).css('width', '20%');
                break;
            case 95:
                $(cursor).css('left', '40%')
                $(currentInput).css('width', '25%');
                break;
            case 100:
                $(cursor).css('left', '45%')
                $(currentInput).css('width', '30%');
                break;
            case 105:
                $(cursor).css('left', '50%')
                $(currentInput).css('width', '35%');
                break;
            case 107:
                $(cursor).css('left', '55%')
                $(currentInput).css('width', '40%');
                break;
            case 110:
                $(cursor).css('left', '60%')
                $(currentInput).css('width', '45%');
                break;
            case 115:
                $(cursor).css('left', '65%')
                $(currentInput).css('width', '50%');
                break;
            case 120:
                $(cursor).hide();
                break;
            case 125:
                $(cursor).show();
                break;
            case 130:
                $(cursor).hide();
                break;
                //line3-----------------------------------------
            case 140:
                $(cursor).show();
                currentInput = $('.input-line', ele)[2];
                $(cursor).css('left', '15%');
                $(cursor).css('top', '55%');
                break;
            case 145:
                $(cursor).hide();
                break;
            case 150:
                $(cursor).show();
                $(cursor).css('left', '20%')
                $(currentInput).css('width', '5%');
                break;
            case 155:
                $(cursor).css('left', '25%')
                $(currentInput).css('width', '10%');
                break;
            case 160:
                $(cursor).css('left', '30%')
                $(currentInput).css('width', '15%');
                break;
            case 165:
                $(cursor).css('left', '35%')
                $(currentInput).css('width', '20%');
                break;
            case 170:
                $(cursor).css('left', '40%')
                $(currentInput).css('width', '25%');
                break;
            case 172:
                $(cursor).css('left', '45%')
                $(currentInput).css('width', '30%');
                break;
            case 176:
                $(cursor).css('left', '50%')
                $(currentInput).css('width', '35%');
                break;
            case 180:
                $(cursor).css('left', '55%')
                $(currentInput).css('width', '40%');
                break;
            case 182:
                $(cursor).css('left', '60%')
                $(currentInput).css('width', '45%');
                break;
            case 185:
                $(cursor).css('left', '65%')
                $(currentInput).css('width', '50%');
                break;
                //line4-----------------------------------------
            case 190:
                currentInput = $('.input-line', ele)[3];
                $(cursor).css('left', '15%');
                $(cursor).css('top', '75%');
                break;



            case 195:
                $(cursor).hide();
                break;
            case 200:
                $(cursor).show();
                break;
            case 205:
                $(cursor).hide();
                break;
            case 210:
                $(cursor).show();
                $(cursor).css('left', '20%')
                $(currentInput).css('width', '5%');
                break;
            case 213:
                $(cursor).css('left', '25%')
                $(currentInput).css('width', '10%');
                break;
            case 215:
                $(cursor).css('left', '30%')
                $(currentInput).css('width', '15%');
                break;
            case 217:
                $(cursor).css('left', '35%')
                $(currentInput).css('width', '20%');
                break;
            case 220:
                $(cursor).css('left', '40%')
                $(currentInput).css('width', '25%');
                break;
            case 225:
                $(cursor).css('left', '45%')
                $(currentInput).css('width', '30%');
                break;
            case 227:
                $(cursor).css('left', '50%')
                $(currentInput).css('width', '35%');
                break;
            case 230:
                $(cursor).css('left', '55%')
                $(currentInput).css('width', '40%');
                break;
            case 235:
                $(cursor).css('left', '60%')
                $(currentInput).css('width', '45%');
                break;
            case 240:
                $(cursor).css('left', '65%')
                $(currentInput).css('width', '50%');
                break;
            case 245:
                $(cursor).css('left', '70%')
                $(currentInput).css('width', '55%');
                break;
            case 246:
                $(cursor).css('left', '75%')
                $(currentInput).css('width', '60%');
                break;
            case 248:
                $(cursor).css('left', '80%')
                $(currentInput).css('width', '65%');
                break;
            case 250:
                $(cursor).css('left', '85%')
                $(currentInput).css('width', '70%');
                break;
            case 260:
                bankVerificationAnimation.inputState = 'stop';
                break;
        }
    }

    function moveIn() {
        moveInTick++;
        if (moveInStart == null) {
            moveInStart = y;
        }

        y = AnimUtil.easeOutElastic(moveInTick, moveInStart, -(moveInStart - restingPoint), 100);

        refresh();
    }

    function moveOut() {
        moveOutTick++;
        if (moveOutStart == null) {
            moveOutStart = y;
        }

        y = AnimUtil.easeInQuad(moveOutTick, moveOutStart, (endPoint + -moveOutStart), 25);

        refresh();
    }

    function refresh() {
        $(ele).css('top', y + '%');
    }
}