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
 	
 	var version = 47;
 	
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
 	//flag - whether total number of users is changed
	var usersUpdated = false;	
 	/********************************************************/
 	/*                 PRIVATE MEMBERS                     */
 	/********************************************************/
 	
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
		AdminUserView.routerInitialize();
		//One time loading of common Header View
		AdminHeaderView.initialize();		
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
 	
 	function backbone_start_navigation()	{
 		Backbone.history.start();
 		if (location.href.indexOf("#") == -1) { //Normal App startup
			Backbone.history.navigate("#/users/list", {trigger:true,replace:true});
		} 		
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
 				AdminHeaderView.setHeaderMenu(showProfileButton);
 			} else {
 				AdminHeaderView.setHeaderMenu();
 			}
 		}
 		
 		AdminHeaderView.setHomeIcon(showHomeLink);
 		AdminHeaderView.setBackIcon(showBackLink);
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
 	
	
	 //This function adds a listener for cache update(if any).
	 //If a update is found, it swaps the new cache and reloads the window.
	function add_cache_listener() {
		if (window.applicationCache) {
			 window.applicationCache.addEventListener('updateready', function(e) {
				if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
					// Browser downloaded a new app cache.
					// Swap it in and reload the page to get the new hotness.
					window.applicationCache.swapCache();
					if (confirm('A new version/update of this App is available! Click "OK" to reload and update your application from the server.')) {
						window.location.reload();
					}
				} 
			});	
		}	 
	 }
 	
 	
 		
 	/********************************************************/
 	/*                 ONE TIME INIT FUNCTION              */
 	/********************************************************/
 
 	(function init()	{
 			//Check if browser is IE
 			isIE = navigator.appVersion.indexOf("MSIE") != -1;
 			$(document).ready(function() {
 				
 				logger.info("On Ready - Starting Initialization");
 				
 				var mainApp = com.compro.application.hsc;
 				mainApp.userinfo.loggedin = true;	
 				mainApp.userinfo.admin = true;
 				
 				logger.info("adding HTML5 cache listener");
 				add_cache_listener();
 
 				logger.info("global error handlers initialization");
 				ajax_init_global_handlers();
 				
 				logger.info("backbone routers initialization");
 				backbone_init_routers();
 				
 				logger.info("backbone navigation start");
 				backbone_start_navigation();
 				//Initializing error modal to trigger logging in modal box each time it is shown.
 				modalEventRegistration();
 				
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
 		"userinfo": userinfo,
 		"flashcards":flashcards,
 		"appHeader":appHeader,
 		"setHeaderOptions":setHeaderOptions,
 		"idTopContainer" : idTopContainer,
 		"clsMainHeader" : clsMainHeader,
 		"currentPanelId" : currentPanelId,
 		"globalAjaxOptions" : globalAjaxOptions,
 		"isIE":isIE,
 		"logger" : logger,
 		"JSLogsSettingsConfig" : JSLogsSettingsConfig,
 		"version" : version,
 		"usersUpdated":usersUpdated
 	}
 
})();
