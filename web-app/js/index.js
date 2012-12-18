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
			"maxLogSize" : "10"
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
		
	/********************************************************/
	/*                 PRIVATE MEMBERS                     */
	/********************************************************/
	
	// SoundManager config 
	var soundManagerConfig = {
		soundManagerObject : null,
		musicPlaying : false,
		musicStopped :  true
	};
	
	// Config 
	var config = {
	};
	
	//User Logged In Flag
	var userinfo = {
			loggedin: false,
			name: "John Doe",
			email: "(john@pearson.com)",
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
			logger.info("ajaxStart");
			
			
		    var elProgress = globalAjaxOptions.elProgress;
		    var cssProgressLoading = globalAjaxOptions.cssProgressLoading;

		    if(!globalAjaxOptions.disableLoadingProgress) {
		        //Show Waiting Icon
		    	$(globalAjaxOptions.elProgress).show();
		    }
		    
			
		});

		$(document).ajaxSend(function (e, xhr, opts) {
		    /* Do Nothing */
		});

		$(document).ajaxError(function(event, xhr, settings, exception) {
			var msgHeader = "Ajax Error!";
		    var msgTitle = "Oops!";
		    var statusCode = "?..";
		 
		    var msgDesc = "An error has occured. Please try again by refreshing your browser or restarting the Application. If the problem persists, please contact your System Administrator.";

		    if (xhr.status === 0) { // Not connected. Verify Network
		    	statusCode = xhr.status;
		    	msgHeader = statusCode + " :No Network Detected!";
		        msgDesc = xhr.responseText;
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
		    
		    var logs = JSLog.Logs['App.Login'];
		    var innerHTML = "<ol>";
		    var planeLogs = "";
		    for (var i = 0, len = logs.length; i < len; i++) {
				innerHTML += "<li value="+(logs.length - i)+">" +logs[logs.length - i] + "</li>";
				// planeLogs is required so that tags are not included in the text for email. Required to add HTML in email.
				planeLogs += logs[i]+" ~~ ";
			}
		    innerHTML += "</ol>";
		    var regex = new RegExp("\<style.*style\>");
		    msgDesc = msgDesc.replace(regex, "");
		    $("#ajax-error-label").text(msgTitle);
		    $('#ajax-error-modal .modal-body .content-header').text(msgHeader);
		    $('#message').html(msgDesc);
		    $('#logs').html(innerHTML);
		    $('#headers').html("<div><h4>Error occured for request: </h4></div><ul>");  
		    $('#headers').append("<li>url: " + settings.url + "</li>");
		    $('#headers').append("<li>type: " + settings.type + "</li>");
		    $('#headers').append("<li>data: " + settings.data + "</li></ul>");
		    $('#ajax-error-modal .modal-footer .mailToAdmin').click(function() {
		    	emailConfig.ccEmails = "";
		    	emailConfig.cc.map(function(element){
		    		emailConfig.ccEmails += "&cc="+element;
		    	})
		    	var email = "mailto:"+emailConfig.adminEmail+"?subject="+emailConfig.subject+ emailConfig.ccEmails + "&body="+planeLogs;
		    	window.open(email);
		    });
		    $('#ajax-error-modal').modal();
		    return true;
		});		        
		$(document).ajaxSuccess(function (e, xhr, opts) {
		        /* Do Nothing */
		});

		$(document).ajaxComplete(function (e, xhr, opts) {
		    /* Do Nothing */
			$(globalAjaxOptions.elProgress).hide();
			
		});

		$(document).ajaxStop(function () {
		    //Stop loading animation
			$(globalAjaxOptions.elProgress).hide();
			logger.info("AjaxStop");
		});
	}
	
	function handleLoginSuccess(isFacebookUser) {
		
		//Check for double call
		if(userinfo.loggedin)	{
			return;
		}
		userinfo.facebookuser =  isFacebookUser;
		userinfo.loggedin = true;
		UserModel.get().fetch({
			success: function(model, response){
				if(model.get('isAdmin')){
					userinfo.admin = true;
				}
				/*
				 * 1st parameter - update header for login
				 * 2nd parameter - showHomeLink
				 * 3rd parameter - setBackLink 
				 */
				setHeaderOptions(true, false, false);
			}
		});	
		Backbone.history.navigate("#/discipline");
	  		
	}
	
	
	function backbone_start_navigation()	{
		Backbone.history.start();
		if (location.href.indexOf("?isFacebookLoginSuccess=") != -1) { //Facebook login success in iOS Home Screen Apps
			facebookLoginCheckTimer=setInterval(function(){getFBLoginStatus()}, 500);
		}	
		else if (location.href.indexOf("#") == -1) //Normal App startup
			Backbone.history.navigate("#/home", {trigger:true,replace:true});		
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
			/*var that=this;
			$('.panel-item').each(function(){
				if(that.currentPanelId.indexOf($(this).attr("id"))<0){
					$(this).hide();
				}
			});*/
			var translationWidth = 0;
			if($(newPanelId).attr("data-order")>$(this.currentPanelId).attr("data-order")){
				translationWidth = $(this.currentPanelId).outerWidth(true);
				applyTransition(panelContainer, 0);
			}else{
				applyTransition(panelContainer, -$(this.currentPanelId).outerWidth(true));
			}
			$(newPanelId).show();
		panelItems.css("float","left");
		$(newPanelId).outerWidth(true) +$(this.currentPanelId).outerWidth(true);
		panelContainer.addClass('easing');
		applyTransition(panelContainer, -translationWidth);
			if(!(typeof callback === 'undefined') )	{
				callback();	
			}
		}
		this.currentPanelId = newPanelId;
		
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
	/*function to accomodate resizing of browser window or content.
	 * @params - currentPanelId
	 * */
	function onResizeTranslationHandler(panelId){
		/*$("#panel-container").removeClass('easing');
		var itemWidth = $("#bb-container").width();
		$("#panel-container").width(itemWidth * $(".panel-item").length);
		$('.panel-item').width(itemWidth);
		var translationWidth = $(panelId).attr("data-order") * -itemWidth;
		applyTransition($("#panel-container"), translationWidth);
		$("#bb-container").height($(panelId).height());*/
	}
		
	/********************************************************/
	/*                 ONE TIME INIT FUNCTION              */
	/********************************************************/

	(function init()	{
			//Check if browser is IE
			isIE = navigator.appVersion.indexOf("MSIE") != -1
			$(document).ready(function() {
				
				logger.info("On Ready - Starting Initialization");

				logger.info("--- global error handlers");
				ajax_init_global_handlers();
				
				logger.info("--- bb routers");
				backbone_init_routers();
				
				logger.info("--- bb start navigation");
				backbone_start_navigation();
				
				logger.info("--- sound manager");
				soundmanager2_init();
				
				logger.info("--- muscula Initialiation");
				muscula_log_init();

				//for resetting translate3d on resize
				$(window).bind("resize.translation", _.bind(function(){
					onResizeTranslationHandler(com.compro.application.hsc.currentPanelId);
					//com.compro.application.hsc.transitionAppPanel(com.compro.application.hsc.currentPanelId);
				}, this));
				
				
				//called on end of transition of panel-container
				$("#panel-container").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(event){ 
					/*
					 * temporary check -- needs to be fixed
					 * transitionend fired on buttons by bootstrap
					 */
					if(event.target!=$("#panel-container")[0]){
						//logger.info("transitionend fired on" + event.target);
						return;
					}
					$("#panel-container").removeClass('easing');
					applyTransition($("#panel-container"),0);
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
				});
				
				logger.info("--- Normalized address bar hiding for iOS & Android");				
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
				
				logger.info("--- phone viewport rotate landscape fix");
				//FIX: iphone viewport scaling bug. The bug occurs when you set the viewport width
				// to device-width and rotate the phone to landscape view.
				(function(doc) {

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

				}(document));				
				
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
		"onResizeTranslationHandler":onResizeTranslationHandler,
		"handleLoginSuccess" : handleLoginSuccess,
		"logger" : logger,
		"JSLogsSettingsConfig" : JSLogsSettingsConfig
	}

})();