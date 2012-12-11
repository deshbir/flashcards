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
		}
	}


    /********************************************************/
	/*                   DEPENDENCIES                       */
	/********************************************************/

	//JS Library Dependencies

	//DOM Dependencies
	var idTopContainer = "#bb-container";
	var clsMainHeader = ".main-header";
	var currentPanelId = -1;
	var globalAjaxOptions = {
		elProgress : ".main-header #loadingIcon",
		cssProgressLoading : "",
		disableLoadingProgress : false
	}
		
	/********************************************************/
	/*                 PRIVATE MEMBERS                     */
	/********************************************************/
	
	// Config 
	var config = {
		soundManagerObject : null
	};
	
	//User Logged In Flag
	var userinfo = {
			loggedin: false,
			name: "John Doe",
			email: "(john@pearson.com)",
			facebookuser: false
	}
	
	//Global Flashcards holder (object of SwipeJs)
	var flashcards;
		
	//Logger
	var logger = JSLog.Register('App.Login');
	
	
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
		    var msgDesc = "An error has occured. Please try again by refreshing your browser or restarting the Application. If the problem persists, please contact your System Administrator.";

		    if (xhr.status === 0) { // Not connected. Verify Network
		        msgDesc = xhr.responseText;
		    } else if (xhr.status == 403) { // Requested page not found. [404]
		        msgHeader = "[403]:The requested url is forbidden.";
		        msgDesc = xhr.responseText;
		    } else if (xhr.status == 404) { // Requested page not found. [404]
		        msgHeader = "[404]:Requested page not found.";
		        msgDesc = xhr.responseText;
		    } else if (xhr.status > 400 && xhr.status< 500) { // Requested page not found. [404]
		    	msgHeader = xhr.status;
		    	msgHeader = ":Client-Side Error.";
		        msgDesc = xhr.responseText;
		    } else if (xhr.status >= 500) { //Internal Server Error [500]
		        msgHeader = "[500]:Internal Server Error";
		        msgDesc = xhr.responseText;
		    } else if (exception === 'parsererror') { //Requested JSON parse failed
		        msgHeader = "Response Parsing Error (Invalid JSON)";
		        msgDesc = xhr.responseText;
		    } else if (exception === 'timeout') { //Server Timeout - Check Connection
		        msgHeader = "Request to server has timed out";
		        msgTitle = "No Network Detected!";
		        msgDesc = "You don't seem to be connected to the network. Please check network settings or connectivity and try again.";
		    } else if (exception === '') { //Server Aborted request
		       msgHeader = "Server Aborted Request";
		    } else { //Unknown Error
		       msgHeader = "Unknown Error";    
		        //xhr.responseText               
		    }
		    
		    var logs = JSLog.Logs['App.Login'];
		    var innerHTML = "<ol>";
		    var planeLogs = "";
		    for (var i = 0, len = logs.length; i < len; i++) {
		    	innerHTML += "<li>" +logs[i] + "</li>";
		    	// planeLogs is required so tha tags are not included in the text for email. Required to add HTML in email.
		    	planeLogs += logs[i]+" ~~ ";
	        }
		    innerHTML += "</ol>";
		    console.log(settings.url + "anurag");
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
	
	
	function backbone_start_navigation()	{
		Backbone.history.start();
		if (location.href.indexOf("#") == -1)
			Backbone.history.navigate("#/home", {trigger:true,replace:true});
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
			
			if(this.currentPanelId == -1)  //First time
			{	
				 $(newPanelId).show("fast",function() {
					 if(!(typeof callback === 'undefined') )  {
				       callback();  	
					 }            
				 });
			}
			else
			{	
				//when window resized easing effect is removed temporarily.
				if(newPanelId == this.currentPanelId ){
					$('#panel-container').removeClass('easing');
				}
				else{
					$('#panel-container').addClass('easing');
				}
				$('.panel-item').css("visibility","hidden");
				$(newPanelId).css("visibility","visible");
				$(this.currentPanelId).css("visibility","visible");
				var itemWidth = $("#bb-container").width();
				$("#panel-container").width(itemWidth * $('.panel-item').length);
				$('.panel-item').width(itemWidth);
				$("#panel-container").css("transform","translate3d("+$(newPanelId).attr("data-order") * -itemWidth+"px,0,0)");
				$("#panel-container").css("-webkit-transform","translate3d("+$(newPanelId).attr("data-order") * -itemWidth+"px,0,0)");
				$("#panel-container").css("-moz-transform","translate3d("+$(newPanelId).attr("data-order") * -itemWidth+"px,0,0)");
				// For IE 10.0
				$("#panel-container").css("-ms-transform","translate3d("+$(newPanelId).attr("data-order") * -itemWidth+"px,0,0)");
				// For IE 9.0
				$("#panel-container").css("-ms-transform","translateX("+$(newPanelId).attr("data-order") * -itemWidth+"px)");
				$("#panel-container").css("-o-transform","translate3d("+$(newPanelId).attr("data-order") * -itemWidth+"px,0,0)");
				if(!(typeof callback === 'undefined') )	{
					callback();	
				}
				//$('#bb-container').height($(newPanelId).height());
			}
			this.currentPanelId = newPanelId;
			
		}
		
	/********************************************************/
	/*                 ONE TIME INIT FUNCTION              */
	/********************************************************/

	(function init()	{
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
					com.compro.application.hsc.transitionAppPanel(com.compro.application.hsc.currentPanelId);
				}, this));
				
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
		"userinfo": userinfo,
		"flashcards":flashcards,
		"appHeader":appHeader,
		"setHeaderOptions":setHeaderOptions,
		"idTopContainer" : idTopContainer,
		"clsMainHeader" : clsMainHeader,
		"currentPanelId" : currentPanelId,
		"globalAjaxOptions" : globalAjaxOptions,
		"transitionAppPanel" : transitionAppPanel
	}

})();