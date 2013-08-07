var HashBangHistory = new function(){

	var changeID = Math.random();
	var oldChangeID = changeID;

	this.init = function(){

		addListners();

		if(hasHashBang()){
			changeSectionBasedOnHashbang();
		}else if(!TroyBlankCom.standAlone){
			$(window)[0].location.href = '#';
		}
	}

	function addListners(){
		$(window).on('hashchange', hashChangeHandler);
		TroyBlankCom.addEventListener(TroyBlankCom.ON_SECTION_CHANGE, sectionChangeHand);
		TroyBlankCom.addEventListener(TroyBlankCom.ON_CONTENT_READY, contentReadyHand);

		//this is the problem, how do you determind how the has was changed??
		//SOLUTION: NEEDS TO BE MORE OF THESE FOR THIS TO WORK!!!! ON ALL INTERACTIONS THAT ARE NOT BROWSER
		//also need to fix the trigger clicks so that the dispatch never fires on the hash nav change
		TroyBlankCom.addEventListener(TroyBlankCom.NAV_INTERACTION_MADE, navInteractionClickHand);
	}

	function updateHashBang(val){
		$(window)[0].location.href = '#'+val;
	}

	function hasHashBang(){
		return String($(window)[0].location.href).indexOf('#') >= 0;
	}

	function changeSectionBasedOnHashbang(){
		var bang = '';
		if(hasHashBang()){
			bang = $(window)[0].location.href.split('#')[1].split(':');
		}else{
			bang = ['main', '#']
		}
		var section = bang[0];
		var link = bang[1];

		if(section == 'portfolio'){
			TroyBlankCom.dispatchEvent(TroyBlankCom.ON_HASH_NAV_CHANGE, {'section':section, 'targ':$('#portfolioCarousel > a[data-link="'+link+'"]')[0]});
    	}else if(section == 'mainNavContent'){
    		TroyBlankCom.dispatchEvent(TroyBlankCom.ON_HASH_NAV_CHANGE, {'section':section, 'targ':$('header nav li a[data-href="'+link+'"]')[0]});
    	}else{
    		TroyBlankCom.dispatchEvent(TroyBlankCom.ON_HASH_NAV_CHANGE, {'section':'main'});
    	}
	}

	//---------------------------------------------------------------------------------------------
	//HANDLERS
	//---------------------------------------------------------------------------------------------
	function sectionChangeHand(){
		if(TroyBlankCom.section == 'main'){
			updateHashBang('');
		}
	}

	function contentReadyHand(){
		updateHashBang(TroyBlankCom.section+':'+TroyBlankCom.currentLink);
	}

	function navInteractionClickHand(){
		changeID = Math.random();
	}

	function hashChangeHandler(){
		if(changeID == oldChangeID){
			changeSectionBasedOnHashbang();
		}
		oldChangeID = changeID;
	}
}