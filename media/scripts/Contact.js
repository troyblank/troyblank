function Contact(){

	var FEILD_DEFAULTS = {'id_name':'Enter your name here', 'id_email':'Enter your email here', 'id_message':'Type me a pretty message here'};

	function init(){
		addDefaults();
		addListeners();
	}

	function addListeners(){
		TroyBlankCom.addEventListener(TroyBlankCom.ON_MEDIA_FLUSH_REQUEST, onMediaFlushRequest);

		$('#contact-form input').on('focus', onInputFocusHand);
		$('#contact-form textarea').on('focus', onInputFocusHand);
		$('#contact-form input').on('focusout', onInputFocusOutHand);
		$('#contact-form textarea').on('focusout', onInputFocusOutHand);
		$('#contact-form input[type=submit]').on('click', submitClickHand);
	}

	function addDefaults(){
		for(var prop in FEILD_DEFAULTS){
			if($('#'+prop).val().length <= 0){
				$('#'+prop).val(FEILD_DEFAULTS[prop]);
			}
		}
	}

	function validateForm(){

	}

	//---------------------------------------------------------------------------------------------
	//HANDLERS
	//---------------------------------------------------------------------------------------------
	function onInputFocusHand(){
		if(FEILD_DEFAULTS[$(this).attr('id')] == $(this).val()){
			$(this).val('');
		}
	}

	function onInputFocusOutHand(){
		if($(this).val().length <= 0){
			$(this).val(FEILD_DEFAULTS[$(this).attr('id')]);
		}
	}

	function onMediaFlushRequest(){
		destroy();
	}

	function submitClickHand(e){
		console.log('click')

		validateForm();

		e.preventDefault();

	}

	//---------------------------------------------------------------------------------------------
	//DESTROY
	//---------------------------------------------------------------------------------------------
	function destroy(){
		removeListeners();
	}

	function removeListeners(){
		$('#contact-form input').off('focus', onInputFocusHand);
		$('#contact-form textarea').off('focus', onInputFocusHand);
		$('#contact-form input').off('focusout', onInputFocusOutHand);
		$('#contact-form textarea').off('focusout', onInputFocusOutHand);
		$('#contact-form input[type=submit]').off('click', submitClickHand);
	}

	init();
}

/*

function contentTest(value){
    return (/\S/.test(value));
}

function emailTest(value){
	return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value));
}

*/