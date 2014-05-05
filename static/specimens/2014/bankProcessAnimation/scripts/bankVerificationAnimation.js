var bankVerificationAnimation = {

    time: 0,
    animOn: true,
    formState: 'stop', //entering, leaving or stop
    inputState: 'stop', //writting, transmitting, or stop
    doorState: 'stop', //open, close, or stop
    checkState: 'stop', //show, hide, or stop

    form: new Form(document.getElementById('form')),
    leftDoor: new BankDoorLeft(document.getElementById('left-door')),
    rightDoor: new BankDoorRight(document.getElementById('right-door')),
    checkMark: new CheckMark(document.getElementById('check-mark')),

    stateIndex: 0,
    states: [{
        time: 50,
        states: {
            'formState': 'entering'
        }
    }, {
        time: 75,
        states: {
            'inputState': 'writting'
        }
    }, {
        time: 325,
        states: {
            'inputState': 'transmitting'
        }
    }, {
        time: 350,
        states: {
            'doorState': 'open'
        }
    }, {
        time: 800,
        states: {
            'doorState': 'close',
            'checkState': 'show'
        }
    }, {
        time: 950,
        states: {
            'formState': 'leaving'
        }
    }, {
        time: 1000,
        states: {
            'animOn': false,
            'checkState': 'hide',
            'formState': 'stop',
            'inputState': 'stop',
            'doorState': 'stop',
        }
    }],

    initialize: function() {
        bankVerificationAnimation.animloop();
    },

    //---------------------------------------------------------------------------------------------
    //ANIMATION
    //---------------------------------------------------------------------------------------------
    animloop: function() {
        if (bankVerificationAnimation.animOn) {
            requestAnimFrame(bankVerificationAnimation.animloop);
            bankVerificationAnimation.updateTime();
            bankVerificationAnimation.checkForNextState();
            bankVerificationAnimation.render();
        } else {
            //loop back again
            bankVerificationAnimation.animOn = true;
            bankVerificationAnimation.time = 0
            bankVerificationAnimation.stateIndex = 0;

            bankVerificationAnimation.form.destroy();

            requestAnimFrame(bankVerificationAnimation.animloop);
        }
    },

    updateTime: function() {
        bankVerificationAnimation.time++;
    },

    checkForNextState: function() {
        var nextAnimationQue = bankVerificationAnimation.states[bankVerificationAnimation.stateIndex];
        if (bankVerificationAnimation.time >= nextAnimationQue.time) {
            bankVerificationAnimation.setStates(nextAnimationQue.states);
            bankVerificationAnimation.stateIndex++;
        }
    },

    setStates: function(states) {
        for (var prop in states) {
            bankVerificationAnimation[prop] = states[prop];
        }
    },

    render: function() {
        //calc container width
        var pw = $(window).width() * 0.5;

        bankVerificationAnimation.form.update();
        bankVerificationAnimation.leftDoor.update();
        bankVerificationAnimation.rightDoor.update();
        bankVerificationAnimation.checkMark.update();
    }
}