function Contact(){

	var FEILD_DEFAULTS = {'id_name':'Enter your name here', 'id_email':'Enter your email here', 'id_message':'Type me a pretty message here'};
	var preloader = null;

	var HAS_COOKIES_DISABLED = function(){var cookieEnabled = (navigator.cookieEnabled) ? true : false; 
	if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled){ document.cookie="testcookie"; cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;}
	return (!cookieEnabled);}();

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

	function addPreloader(){
		$('#contact-form form').css('display', 'none');
		$('#contact-form').prepend('<div id="contact_service_loader" class="atomic-preloader" />');
        preloader = new atomicPreloader('contact_service_loader', true);
	}

	function removePreloader(){
		if($('#contact_service_loader').length > 0){
           preloader.destroy(); 
           $('#contact_service_loader').remove();
        }
	}

	function callWebService(){
		var url = '/contact/send_email/';
		var data = {'name':$('#id_name').val(), 'email':$('#id_email').val(), 'message':$('#id_message').val()}

		$.ajax({
            url: url,
            type:'POST',
            dataType: 'json',
            data: data,
            success: callSuccess,
            error: callFailure
        });
	}

	function callSuccess(){
		removePreloader();
		$('#contact-form .thank-you').css('display', 'block');
	}

	function callFailure(xhr, status, errorThrown){
		//console.log(status+' - '+xhr.status);
		removePreloader();
		$('#contact-form .error').css('display', 'block');
		if(HAS_COOKIES_DISABLED){
			$('#contact-form .error h2').html('We have detected you have cookies disabled for your browser. Email could not be sent.');
		}
	}

	//---------------------------------------------------------------------------------------------
	//VALIDATION
	//---------------------------------------------------------------------------------------------
	function validateForm(){
		var passed = true;

		var id ='id_name';
		if(!defaultTest(id) || !contentTest($('#'+id).val())){
			passed = false;
			FEILD_DEFAULTS[id] = 'Please tell me who you are.';
			showErrorOnFeild(id);
		}

		var id ='id_email';
		if(!defaultTest(id) || !emailTest($('#'+id).val())){
			passed = false;
			FEILD_DEFAULTS[id] = 'Your email address was invalid, try again.';
			showErrorOnFeild(id);
		}

		var id ='id_message';
		if(!defaultTest(id) || !contentTest($('#'+id).val())){
			passed = false;
			FEILD_DEFAULTS[id] = 'Nothing to say? the sumbit button doesn\'t like that. type me a pretty message here.';
			showErrorOnFeild(id);
		}
		
		return passed;
	}

	function showErrorOnFeild(id){
		$('#'+id).val(FEILD_DEFAULTS[id]);
		$('#'+id).css('color', '#ff0000');
	}

	function defaultTest(id){
		return $('#'+id).val() != FEILD_DEFAULTS[id];
	}

	function contentTest(value){
	    return (/\S/.test(value));
	}

	function emailTest(value){
		return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value));
	}

	//---------------------------------------------------------------------------------------------
	//HANDLERS
	//---------------------------------------------------------------------------------------------
	function onInputFocusHand(){
		if(FEILD_DEFAULTS[$(this).attr('id')] == $(this).val()){
			$(this).val('');
			$(this).css('color', '');
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
		//console.log('click')

		if(validateForm()){
			addPreloader();
			

			callWebService();
		}

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


//---------------------------------------------------------------------------------------------
//DJANGO CSRF AJAX PRIMER
//---------------------------------------------------------------------------------------------
//allows ajax post calls to django via cookie aquired csrftoken
DJANGO_CSRF_SETUP = {
	csrfSafeMethod:function(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	},
	readSessionCookie:function(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' '){
	            c = c.substring(1,c.length);
	        }
	        if (c.indexOf(nameEQ) == 0){
	            return c.substring(nameEQ.length,c.length);
	        }
	    }
	    return null;
	}
}
$.ajaxSetup({
    crossDomain: false, // obviates need for sameOrigin test
    beforeSend: function(xhr, settings) {
        if (!DJANGO_CSRF_SETUP.csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", DJANGO_CSRF_SETUP.readSessionCookie('csrftoken'));
        }
    }
});