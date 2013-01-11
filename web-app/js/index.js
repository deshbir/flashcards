 /*
 -----------------
 GLOBAL Util Module
 -----------------
 */
 
 function namespace(namespaceString) {
     var parts = namespaceString.split('.'),
         parent = window,
         currentPart = '';
 
     for(var i = 0, length = parts.length; i < length; i++) {
         currentPart = parts[i];
         parent[currentPart] = parent[currentPart] || {};
         parent = parent[currentPart];
     }
 
     return parent;
 }
 
 /*
 -----------------
 Anonymous Application Module
 -----------------
 
 Name: HSC app
 
 */
 namespace("com.compro.application");
 
 com.compro.application.hsc = (function() {
 	
 	var version = 40;
 	var emailConfig = {
 			adminEmail : "deshbir.dugal@comprotechnologies.com", 
 			subject : "Pearson HSC Error Report",
 			// "cc" is an array. Add other values in comma separated format. 
 			cc : ["preeti.gupta@comprotechnologies.com"]
 	}
 	
 	// Add separate Log Settings from Mascula for different logs.
 	var musculaLogSettingsConfig = {
 		"default-log" : {
 			logId:"aaa4d152-e808-4f89-9cde-3e7b396ae1f8",
 			suppressErrors: false,
 			branding: 'none'
 		},
 		"q1-pearson-hsc.herokuapp.com" : {
 			logId:"MnDNuBC-RkEpE",
 			suppressErrors: false,
 			branding: 'none'
 		},
 		"d1-pearson-hsc.herokuapp.com" : {
 			logId:"s5zFzBC-Ug6Ff",
 			suppressErrors: false,
 			branding: 'none'
 		},
 		"p-pearson-hsc.herokuapp.com" : {
 			logId:"xhbkHCC-xfrzib",
 			suppressErrors: false,
 			branding: 'none'
 		}
 	}
 	//Logger config
 	var JSLogsSettingsConfig = {
 			"loggerPrefix" : "App.Login",
 			"maxLogSize" : "50"
 	}
 
 
     /********************************************************/
 	/*                   DEPENDENCIES                       */
 	/********************************************************/
 
 	//JS Library Dependencies
 
 	//DOM Dependencies
 	var idTopContainer = "#bb-container";
 	var clsMainHeader = ".main-header";
 	var currentPanelId = -1;
 	var isIE = false;
 	var globalAjaxOptions = {
 		elProgress : "#loadingIcon",
 		cssProgressLoading : "",
 		disableLoadingProgress : false
 	}
 	var mobileScreenWidth = 767;
 		
 	/********************************************************/
 	/*                 PRIVATE MEMBERS                     */
 	/********************************************************/
 	
 	// SoundManager config 
 	var soundManagerConfig = {
 		soundManagerObject : null,
 		musicPlaying : false,
 		musicStopped :  true
 		//playText:null,
 		//pauseText:null,
 		//stopText:null,
 	};
 	
 	// Config 
 	var config = {
 	};
 	
 	//User Logged In Flag
 	var userinfo = {
 			loggedin: false,
 			name: "",
 			email: "",
 			facebookuser: false,
 			admin: false
 	}
 	
 	//Global Flashcards holder (object of SwipeJs)
 	var flashcards;
 		
 	//Logger
 	var logger = JSLog.Register(JSLogsSettingsConfig.loggerPrefix);
 	
 	//...
 	var facebookLoginCheckTimer;
 	var facebookLoginTries=20;
 	
 	/*
 	 * Backbone Initialization
 	 * 
 	 * 
 	 */
 	function backbone_init_routers()	{
 		HomeView.routerInitialize();
 		DisciplineView.routerInitialize();
 		ProductView.routerInitialize();
 		TestView.routerInitialize();
 		
 		//One time loading of common Header View
 		HeaderView.initialize();
 	}
 	function updateUser(){
 		UserModel.get().fetch({
			success: function(model, response){
				if(response.error){
					userinfo.loggedin = false;
				} else {
					userinfo.loggedin = true;
					userinfo.name = model.get("username");
					userinfo.email =  model.get("email");
					userinfo.admin =  model.get("isAdmin");
					userinfo.facebookuser = model.get("isFacebookUser");					
				}
				UserModel.destroy();
			},
			async:false
		});
 	}
 	/*
 	 * Global Viewas
 	 * 
 	 * 
 	 */
 	var appHeader;
 	
 	
 	
 	/*
 	 * Global errorHandler 
 	 */
 	function ajax_init_global_handlers()	{
 		/* -------------  Ajax events fire in following order ----------------*/
 
 		$(document).ajaxStart(function () {
 			
 		    var elProgress = globalAjaxOptions.elProgress;
 		    var cssProgressLoading = globalAjaxOptions.cssProgressLoading;
 
 		    if(!globalAjaxOptions.disableLoadingProgress) {
 		        //Show Waiting Icon
 		    	$(globalAjaxOptions.elProgress).show();
 		    }
 		    
 			
 		});
 		
 		$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
 			var requestURL = options.url;
 			if (requestURL.indexOf("?") > -1) {
 				requestURL = requestURL + "&v="  + version; 				
 			} else {
 				requestURL = requestURL + "?v=" + version;
 			}
 			options.url = requestURL;
 		});
 
 		$(document).ajaxSend(function (e, xhr, opts) {
 		    /* Do Nothing */
 		});
 
 		$(document).ajaxError(function(event, xhr, settings, exception) {
 			var msgHeader = "Ajax Error!";
 		    var msgTitle = "Oops!";
 		    var statusCode = "?..";
 		 
 		    var msgDesc = "An error has occured. Please try again by refreshing your browser or restarting the Application. If the problem persists, please contact your System Administrator.";
 
 		    if (xhr.status == 0) { // Not connected. Verify Network
 		    	statusCode = xhr.status;
 		    	msgHeader = statusCode + " :No Network Detected!";
 		    } else if (xhr.status == 401) { // UnAuthorized
 		    	Backbone.history.navigate("#/home");
 			    return true;
 		    } else if (xhr.status == 403) { // Requested page not found. [404]
 		    	statusCode = xhr.status;
 		    	msgHeader = statusCode + " :The requested url is forbidden.";
 		        msgDesc = xhr.responseText;
 		    } else if (xhr.status == 404) { // Requested page not found. [404]
 		    	statusCode = xhr.status;
 		    	msgHeader = statusCode + " :Requested page not found.";
 		        msgDesc = xhr.responseText;
 		    } else if (xhr.status > 400 && xhr.status< 500) { // Requested page not found. [404]
 		    	statusCode = xhr.status;
 		    	msgHeader = statusCode + " :Client-Side Error.";
 		        msgDesc = xhr.responseText;
 		    } else if (xhr.status >= 500) { //Internal Server Error [500]
 		    	statusCode = xhr.status;
 		    	msgHeader = statusCode + " :Internal Server Error";
 		        msgDesc = xhr.responseText;
 		    } else if (exception === 'parsererror') { //Requested JSON parse failed
 		        msgHeader = statusCode + " :Response Parsing Error (Invalid JSON)";
 		        msgDesc = xhr.responseText;
 		    } else if (exception === 'timeout') { //Server Timeout - Check Connection
 		        msgHeader = statusCode + "Request to server has timed out";
 		        msgTitle = " :No Network Detected!";
 		        msgDesc = "You don't seem to be connected to the network. Please check network settings or connectivity and try again.";
 		    } else if (exception === '') { //Server Aborted request
 		       msgHeader = statusCode + " :Server Aborted Request";
 		       msgDesc = xhr.responseText
 		    } else { //Unknown Error
 		       msgHeader = statusCode + " :Unknown Error";    
 		       msgDesc = xhr.responseText               
 		    }
 		    logger.error("Ajax Error  - statusCode:"+statusCode+" msgHeader :"+msgHeader);
 		    var regex = new RegExp("\<style.*style\>");
 		    msgDesc = msgDesc.replace(regex, "");
 		    $("#ajax-error-label").text(msgTitle);
 		    $('#ajax-error-modal .modal-body .content-header').text(msgHeader);
 		    $('#message').html(msgDesc);
 		    $('#headers').html("<ul>");  
 		    $('#headers').append("<li>url: " + settings.url + "</li>");
 		    $('#headers').append("<li>type: " + settings.type + "</li>");
 		    $('#headers').append("<li>data: " + settings.data + "</li></ul>");
 		    if(statusCode == 0){
		    	$('#ajax-error-modal .modal-body .content-body').hide();
		    	$('#no-network').show();
		    } else {
		    	$('#no-network').hide();
		    	$('#ajax-error-modal .modal-body .content-body').show();
		    }
 		    $('#ajax-error-modal').modal();
 		    return true;
 		});		        
 		$(document).ajaxSuccess(function (e, xhr, opts) {
 		        /* Do Nothing */
 		});
 
 		$(document).ajaxComplete(function (e, xhr, opts) {
 		    /* Do Nothing */
 		});
 
 		$(document).ajaxStop(function () {
 		    //Stop loading animation
 			$(globalAjaxOptions.elProgress).hide();
 		});
 	}
 	
 	function handleLoginSuccess(isFacebookUser) {
 		
 		//Check for double call
 		if(userinfo.loggedin)	{
 			return;
 		}
 		userinfo.facebookuser =  isFacebookUser;
 		userinfo.loggedin = true;
 		Backbone.history.navigate("#/discipline");
 	}
 	
 	
 	function backbone_start_navigation()	{
 		Backbone.history.start();
 		if (location.href.indexOf("?isFacebookLoginSuccess=") != -1) { //Facebook login success in iOS Home Screen Apps
 			facebookLoginCheckTimer=setInterval(function(){getFBLoginStatus()}, 500);
 		}
 	}
 	
 	function getFBLoginStatus(){
 		
 		FB.getLoginStatus(function(response) {
 			  if (response.status === 'connected')  {
 				  clearInterval(facebookLoginCheckTimer);
 				  handleLoginSuccess(true);
 			  }
 			  else
 			  {
 				  facebookLoginTries--;
 				  if(facebookLoginTries == 0)	{
 					  //No more checking
 					  clearInterval(facebookLoginCheckTimer);
 					  facebookLoginTries=20;
 					  alert("Unable to login via Facebook. Did not recive a timely response from Facebook.")
 				  }
 			  }
 		});
 	}
 	
 	function soundmanager2_init()	{
 		soundManager.setup({
 			  // disable or enable debug output
 			  debugMode: false,
 			  // use HTML5 audio for MP3/MP4, if available
 			  preferFlash: false,
 			  useFlashBlock: false,
 			  // path to directory containing SM2 SWF
 			  url: 'images/sm/',
 			  // optional: enable MPEG-4/AAC support (requires flash 9)
 			  flashVersion: 9
 			});
 	}
 	
 	function pagePlayer_init(){
 		var that = this;
 		/* -------------------------------------------------*/
 		var pagePlayerPlay = pagePlayer.events.play;
 		var pagePlayerGetNextItem = pagePlayer.getNextItem;
 		pagePlayer.config.updatePageTitle = false;
 		pagePlayer.events.play = function(){
 			$("#music").show();
 			$("#music i").removeClass('icon-pause-hsc');
 			$("#music i").addClass('icon-mute-hsc');
 			if(soundManagerConfig.playText){
 				$("#music a").attr('title',soundManagerConfig.playText);
 			} else {
 				$("#music a").attr('title','Playing Audio. Select to pause.');
 			}
 			soundManagerConfig.musicPlaying = true;
 			soundManagerConfig.musicStopped = false;
 			soundManagerConfig.audioPlayPage = com.compro.application.hsc.currentPanelId;
 			var soundManager = this;
 			soundManagerConfig.soundManagerObject = soundManager;
 			pagePlayerPlay.call(soundManager);
 			$(".sm2_playing i").toggleClass('icon-volume-up icon-pause');
 		}
 		var pagePlayerPause = pagePlayer.events.pause;
 		pagePlayer.events.pause = function(){
 			$("#music i").addClass('icon-pause-hsc');
 			$("#music i").removeClass('icon-mute-hsc');
 			if(soundManagerConfig.pauseText){
 				$("#music a").attr('title',soundManagerConfig.pauseText);
 			} else {
 				$("#music a").attr('title','Audio Paused. Select to resume.');
 			}
 			soundManagerConfig.musicPlaying = false;
 			pagePlayerPause.call(this);
 			$(".sm2_paused i").toggleClass('icon-volume-up icon-pause');
 		}
 		var pagePlayerResume = pagePlayer.events.resume;
 		pagePlayer.events.resume = function(){
 			soundManagerConfig.musicPlaying = true;
 			$("#music i").removeClass('icon-pause-hsc');
 			$("#music i").addClass('icon-mute-hsc');
 			if(soundManagerConfig.playText){
 				$("#music a").attr('title',soundManagerConfig.playText);
 			} else {
 				$("#music a").attr('title','Playing Audio. Select to pause.');
 			}
 			pagePlayerResume.call(this);
 			$(".sm2_playing i").addClass('icon-volume-up');
 			$(".sm2_playing i").addClass('icon-pause'); 
 		}
 		var pagePlayerStop = pagePlayer.events.stop;
 		pagePlayer.events.stop = function(){
 			soundManagerConfig.musicPlaying = false;
 			soundManagerConfig.musicStopped = true;
 			$(".sm2_playing i").removeClass('icon-volume-up');
 			$(".sm2_playing i").removeClass('icon-pause');
 			$("#music i").removeClass('icon-pause-hsc');
			$("#music").hide();
 			pagePlayerStop.call(this);
 			soundManagerConfig.audioPlayPage = "";

 		}
 		var pagePlayerFinish = pagePlayer.events.finish;
 		pagePlayer.events.finish = function(){
 			$("#music i").addClass('icon-pause-hsc');
 			$("#music i").removeClass('icon-mute-hsc');
 			$("#music").hide();
 			soundManagerConfig.musicPlaying = false;
 			soundManagerConfig.musicStopped = true;
 			soundManagerConfig.audioPlayPage = "";
 			$(".sm2_playing i").removeClass('icon-volume-up');
 			$(".sm2_playing i").removeClass('icon-pause');
 			if(DisciplineView.detailbbView!=null && com.compro.application.hsc.currentPanelId==DisciplineView.detailbbView.myPanelId){
 				if(pagePlayer.getNextItem(this._data.oLI)==null){
 					DisciplineView.detailbbView.loadNextAudioTemplate();
 				}
 			}
 			pagePlayerFinish.call(this);
 		}
 		soundManager.onready(function() {
 			  pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
 		});	
 	}
 	// Util function - for adding suffix in images
 	function addSuffixToFilepath(filepath, suffix)	{
 
 	 	if(typeof filepath === 'undefined' || typeof suffix === 'undefined')	{
 	 		return filepath;
 	   	}
 	   	var retVal = filepath;
 
 	 	var arr=new Array()
 	  	arr=filepath.split('.')
 
 		if (typeof arr[1] !== 'undefined' && arr[1] !== null) {
 	  		retVal=arr[0] + suffix + "." + arr[1]	
 	  	}
 	  	return retVal;
 	}	
 	
 	function muscula_log_init()	{
 		var domain = document.domain;
 		if(!musculaLogSettingsConfig[domain]) {
 			// Add the errors to the default logs file if the domain don't have separate logs config. 
 			domain = "default-log";
 		}
 		var masculaLogSettings = musculaLogSettingsConfig[domain];
 		
 	    window.Muscula = { settings:{
 	        logId:masculaLogSettings.logId,
 	        suppressErrors: masculaLogSettings.suppressErrors,
 	        branding: masculaLogSettings.branding
 	    }};
 	    (function () {
 	        var m = document.createElement('script'); m.type = 'text/javascript'; m.async = true;
 	        m.src = (window.location.protocol == 'https:' ? 'https:' : 'http:') +
 	            '//musculahq.appspot.com/Muscula.js';
 	        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);
 	        window.Muscula.run=function(c){eval(c);window.Muscula.run=function(){};};
 	        window.Muscula.errors=[];window.onerror=function(){window.Muscula.errors.push(arguments);
 	        return window.Muscula.settings.suppressErrors===undefined;}
 	    })();
 	}
 function modalEventRegistration(){
	    $('#ajax-error-modal').on('show', function () {
	    	if($('#ajax-error-label').html().indexOf("version")==-1) {
	    		$('#ajax-error-label').append(" <small>version " + version+"</small>");
	    	}
			var innerHTML = getJSLogsAsList;
		    $('#logs').html(innerHTML);
	    });
	    
	    $('#error-report').on('show', function () {
		    var innerHTML = getJSLogsAsList;
		    var date = new Date();
		    var dateString = date.toString(); 
		    $('#error-report .modal-body .date .date-data').html(dateString);
		    $('#error-report .modal-body .date .version-data').html(version);
		    $('#error-report .modal-body .content-header').html($('#ajax-error-modal .modal-body .content-header').html());
		    $('#error-report .modal-body .content-body .logs').html(innerHTML);
		    $('#error-report .modal-body .content-body .params').html($('#headers').html());
		    $('#error-report .modal-body .content-body .message').html($('#message').html());
	    });

	    $("#ajax-error-modal .modal-footer .generateErrorReport").click(function(){
	    	$('#error-report').modal();
	    }); 
	    		
	}	
	function getJSLogsAsList() {
		var logs = JSLog.Logs['App.Login'];
		var innerHTML = "<ol>";
		var planeLogs = "";
		for (var i = 0, len = logs.length; i < len; i++) {
			innerHTML += "<li value="+(logs.length - i)+">" +logs[logs.length - i - 1] + "</li>";
			// planeLogs is required so that tags are not included in the text for email. Required to add HTML in email.
			planeLogs += logs[i]+" ~~ ";
		}
	    innerHTML += "</ol>";
	    return innerHTML;
	}

 	
 	function setHeaderOptions(updateHeader, showHomeLink, showBackLink, showProfileButton) {
 		if (updateHeader) {
 			if (showProfileButton != undefined) {
 				HeaderView.setHeaderMenu(showProfileButton);
 			} else {
 				HeaderView.setHeaderMenu();
 			}
 		}
 		
 		HeaderView.setHomeIcon(showHomeLink);
 		HeaderView.setBackIcon(showBackLink);
 	}	
 	
 	function transitionAppPanel(newPanelId, callback) {
 		var panelContainer = $('#panel-container');
 		var panelItems = $('.panel-item');
 		if(this.currentPanelId == -1)  //First time
 		{	
 			panelItems.hide();
 			 $(newPanelId).show("fast",function() {
 				 if(!(typeof callback === 'undefined') )  {
 			       callback();  	
 				 }
 				 //set fixed width of panel on loading first time
 				 panelContainer.removeClass('easing');
 			 });
 		}
 		else{
 			$(this.currentPanelId).width($(this.currentPanelId).width());
 			$(newPanelId).width($(this.currentPanelId).width());
 			panelContainer.width($(newPanelId).outerWidth(true) +$(this.currentPanelId).outerWidth(true));
 			var translationWidth = 0;
 			if($(newPanelId).attr("data-order")>$(this.currentPanelId).attr("data-order")){
 				translationWidth = $(this.currentPanelId).outerWidth(true);
 				removeTransition(panelContainer);
 			}else{
 				applyTransition(panelContainer, -$(this.currentPanelId).outerWidth(true));
 			}
 			$(newPanelId).show(0);
	 		panelItems.css("float","left");
	 		$(newPanelId).outerWidth(true) +$(this.currentPanelId).outerWidth(true);
	 		panelContainer.addClass('easing');
	 		applyTransition(panelContainer, -translationWidth);
	 			if(!(typeof callback === 'undefined') )	{
	 				callback();	
	 			}
	 		}
	 		this.currentPanelId = newPanelId;
	 		if(getInternetExplorerVersion()>-1 && getInternetExplorerVersion()<=9 ){
				transitionEndHandler();
			}
 	}
 	
 	/*
 	 * function to apply cross browser transition effect for sliding
 	 * (works for only X coordinate)
 	 * @params 
 	 * 		- element(jquery wrapper) to apply the trasition on
 	 * 		- width to be translated (can be -ve or +ve)
 	 * */
 	function applyTransition(element, width){
 		element.css({
 			"transform":"translate3d("+width+"px,0,0)",
 			"-webkit-transform":"translate3d("+width+"px,0,0)",
 			"-moz-transform":"translate3d("+width+"px,0,0)",
 			// For IE 10.0
 			"-ms-transform":"translate3d("+width+"px,0,0)",
 			// For IE 9.0
 			"-ms-transform":"translateX("+width+"px)",
 			"-o-transform":"translate3d("+width+"px,0,0)"
 		});
 	}
 	
 	/*
 	 * function to remove translation(cross-browser)
 	 * 
 	 */
 	function removeTransition(element){
 		element.css({
 			"transform":"none",
 			"-webkit-transform":"none",
 			"-moz-transform":"none",
 			// For IE 10.0
 			"-ms-transform":"none",
 			// For IE 9.0
 			"-ms-transform":"none",
 			"-o-transform":"none"
 		});
 	}
 	
 	//Groups for riloader to load images lazily depending upon screen-size.
 	//Groups for riloader to load images lazily depending upon screen-size.
 	var responsiveRules = {
		getProdListGrp : function(){
				var group = new Riloadr({
					defer: 'load',
			 		onerror: function(){
			 			logger.error("Failed loading image '" + this.alt + "'!");
			 		},
			 		oncomplete: function(){
			 			if($(window).width()>mobileScreenWidth)
							resizeColumns("#panel_discipline-home .row-fluid",true,"audio-playing");
			 		},
			 		retries: 1,
			 		breakpoints: [
								{name: 'thumb3', maxWidth: 240},
								{name: 'thumb3', minWidth: 241, maxWidth: 320},
								{name: 'thumb3', minWidth: 241, maxWidth: 320, minDevicePixelRatio: 2}, 
								{name: 'thumb3', minWidth: 321, maxWidth: 640},
								{name: 'thumb2', minWidth: 641},
								{name: 'thumb2', minWidth: 384, minDevicePixelRatio: 2} // For Retina Display In IPAD 3 Generation
			 		           ]
		 	});
			return group;
		},
		getHomeImageGrp : function(){
			var group = new Riloadr({
				defer: 'foldDistance',
				name: 'homegrp',
		 		onerror: function(){
		 			logger.error("Failed loading image '" + this.alt + "'!");
		 		},
		 		retries: 1,
		 		breakpoints: [
							{name: '', maxWidth: 767},
							{name: '_Larger', minWidth: 384, minDevicePixelRatio: 2}, // For Retina Display In IPAD 3 Generation
							{name: '_Larger', minWidth: 768}
		 		           ]
			});
			return group;
		}
		
 	}
 	//function to handle "transitionend" event of panel-container
	 function transitionEndHandler(event){ 
		/*
		 * temporary check -- needs to be fixed
		 * transitionend fired on buttons by bootstrap
		 */
		if(event && event.target!=$("#panel-container")[0]){
			//logger.info("transitionend fired on" + event.target);
			return;
		}
		
		//removing the styles added for trasitioning 
		$("#panel-container").removeClass('easing');
		removeTransition($("#panel-container"));
		$("#panel-container").width("auto");
		$('.panel-item').css({
			"float":"none",
			"width":"auto"
			});
		var myApp = com.compro.application.hsc;
		$('.panel-item').each(function(){
			if(myApp.currentPanelId.indexOf($(this).attr("id"))<0){
				$(this).hide();
			}
		});
		$(myApp.currentPanelId).show();
		//$(myApp.currentPanelId).width("auto");
	}
 	
	 function GATrackPageView(){
		var trackPage = true;
		var urlParametersString = window.location.search.replace( "?", "" );
		if(urlParametersString != ""){
			var urlParameters = urlParametersString.split("&");
			for(var i=0 ; i< urlParameters.length ; i++){
				if(urlParameters[i] == "qa=true"){
					trackPage = false;
				}
			}
		}
		if(trackPage) {	
			var url = Backbone.history.getFragment();
			_gaq.push(['_trackPageview', "/#/"+url]);
		}
	}
 	
 	//Check if browser is IE
	 function getInternetExplorerVersion()
	 	// Returns the version of Internet Explorer or a -1
	 	// (indicating the use of another browser).
	 	{
	 	  var rv = -1; // Return value assumes failure.
	 	  if (navigator.appName == 'Microsoft Internet Explorer')
	 	  {
	 	    var ua = navigator.userAgent;
	 	    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	 	    if (re.exec(ua) != null)
	 	      rv = parseFloat( RegExp.$1 );
	 	  }
	 	  return rv;
	 	}
	 
	 //Object can be a dom object/Jquery Object or a selector string
	 function resizeColumns (object, isRowByRow, exemptClass){ //for setting the min-height of each column based on the maximun height of that row.
		
		 var setCurrentTallest = function(obj, currTallest){
		   $(obj).children().each(function(){
				if (Number.prototype.pxToEm) currTallest = currTallest.pxToEm(); //use ems unless px is specified
				// for ie6, set height since min-height isn't supported
				if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'height': currTallest}); }
				$(this).children().css({'min-height': currTallest}); 
			});
		 }
		 
		 var currentTallest = 0;
		 $(object).each(function(){
			if(isRowByRow){
				currentTallest = 0;
			}
			$(this).children().each(function(i){
				$(this).children().each(function(){
					if(exemptClass){
						if($(this).hasClass(exemptClass)){
							  return;
						}
					}
					if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
				});
			});
			if(isRowByRow){
				setCurrentTallest(this,currentTallest);
			}
	    
	   });
	   if(!isRowByRow) {
		   $(object).each(function(){
			   setCurrentTallest(this,currentTallest);
		   });
	   }
	 }
	 
	 //Object can be a dom object/Jquery Object or a selector string
	 function resetColumns (object){ // for removing the min-height of each column.
		$(object).each(function(){
			$(this).children().each(function(){
				if (Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
				// for ie6, set height since min-height isn't supported
				if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'height': ''}); }
				$(this).children().css({'min-height':''}); 
			});
	    
		});
	}
 		
 	/********************************************************/
 	/*                 ONE TIME INIT FUNCTION              */
 	/********************************************************/
 
 	(function init()	{
 			//Check if browser is IE
 			isIE = navigator.appVersion.indexOf("MSIE") != -1;
 			pagePlayer = new PagePlayer();
 			$(document).ready(function() {
 				if(isIE && getInternetExplorerVersion()<9){
					$('#unsupported-browser-version-modal').modal();
				}
 				logger.info("On Ready - Starting Initialization"); 				
 
 				logger.info("global error handlers initialization");
 				ajax_init_global_handlers();
 				//updating user state whenever page is refreshed. 
 				updateUser();
 				logger.info("backbone routers initialization");
 				backbone_init_routers();
 				
 				logger.info("backbone navigation start");
 				backbone_start_navigation();
 				//Initializing error modal to trigger logging in modal box each time it is shown.
 				modalEventRegistration();
 				logger.info("sound manager initialization");
 				soundmanager2_init();
 				logger.info("Page Player initialization");
 				pagePlayer_init();
 				
 				logger.info("muscula initialization");
 				muscula_log_init();
 
 				//to remove styles added for trasitioning on end of transition
				$("#panel-container").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",transitionEndHandler);
 				
 				/*! Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License */
 				(function( win ){
 				    var doc = win.document;
 
 				    // If there's a hash, or addEventListener is undefined, stop here
 				    if( !location.hash && win.addEventListener ){
 
 				        //scroll to 1
 				        window.scrollTo( 0, 1 );
 				        var scrollTop = 1,
 				            getScrollTop = function(){
 				                return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
 				            },
 
 				        //reset to 0 on bodyready, if needed
 				            bodycheck = setInterval(function(){
 				                if( doc.body ){
 				                    clearInterval( bodycheck );
 				                    scrollTop = getScrollTop();
 				                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
 				                }
 				            }, 15 );
 
 				        win.addEventListener( "load", function(){
 				            setTimeout(function(){
 				                //at load, if user hasn't scrolled more than 20 or so...
 				                if( getScrollTop() < 20 ){
 				                    //reset to hide addr bar at onload
 				                    win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
 				                }
 				            }, 0);
 				        } );
 				    }
 				})( window );
 				
 				//FIX: iphone viewport scaling bug. The bug occurs when you set the viewport width
 				// to device-width and rotate the phone to landscape view.
/* 				(function(doc) {
 
 				    var addEvent = 'addEventListener',
 				        type = 'gesturestart',
 				        qsa = 'querySelectorAll',
 				        scales = [1, 1],
 				        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
 
 				    function fix() {
 				        meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
 				        doc.removeEventListener(type, fix, true);
 				    }
 
 				    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
 				        fix();
 				        scales = [.25, 1.6];
 				        doc[addEvent](type, fix, true);
 				    }
 
 				}(document));	*/			
 				
 				logger.info("On Ready - Completed Initialization");
 			});
 
 					
 	})();
 
 	/********************************************************/
 	/*                 Public   							*/
 	/********************************************************/
 
 	return	{
 		"config":config,
 		"soundManagerConfig":soundManagerConfig,
 		"userinfo": userinfo,
 		"flashcards":flashcards,
 		"appHeader":appHeader,
 		"setHeaderOptions":setHeaderOptions,
 		"idTopContainer" : idTopContainer,
 		"clsMainHeader" : clsMainHeader,
 		"currentPanelId" : currentPanelId,
 		"globalAjaxOptions" : globalAjaxOptions,
 		"transitionAppPanel" : transitionAppPanel,
 		"isIE":isIE,
 		"handleLoginSuccess" : handleLoginSuccess,
 		"logger" : logger,
 		"addSuffixToFilepath" : addSuffixToFilepath,
 		"JSLogsSettingsConfig" : JSLogsSettingsConfig,
 		"resizeColumns":resizeColumns,
 		"resetColumns":resetColumns,
 		"version" : version,
 		"pagePlayer" : pagePlayer,
 		"getInternetExplorerVersion": getInternetExplorerVersion,
 		"GATrackPageView":GATrackPageView,
 		"responsiveRules":responsiveRules
 	}
 
})();
