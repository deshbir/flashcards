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
			subject : "Error Reporting",
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
		disableLoadingProgress : true
	}
		
	/********************************************************/
	/*                 PRIVATE MEMBERS                     */
	/********************************************************/
	
	// Config 
	var config = {
	};
	
	//User Logged In Flag
	var userinfo = {
			loggedin: false,
			name: "John Doe",
			email: "(john@pearson.com)"
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
			
			/*
			
		    var elProgress = globalAjaxOptions.elProgress;
		    var cssProgressLoading = globalAjaxOptions.cssProgressLoading;

		    if(!globalAjaxOptions.disableLoadingProgress) {
		        //Show Waiting Icon
		    	$(globalAjaxOptions.elProgress).show()
		    }
		    */
			
		});

		$(document).ajaxSend(function (e, xhr, opts) {
		    /* Do Nothing */
		});

		$(document).ajaxError(function(event, xhr, settings, exception) {
		    var msgHeader = "Oops!";
		    var msgTitle = "Error!";
		    var msgDesc = "An error has occured. Please try again by refreshing your browser or restarting the Application. If the problem persists, please contact your System Administrator.";

		    if (xhr.status === 0) { // Not connected. Verify Network
		        var msgHeader = "Not Connected to Network";
		    } else if (xhr.status == 404) { // Requested page not found. [404]
		        var msgHeader = "Requested page not found. [404]";
		    } else if (xhr.status == 404) { // Requested page not found. [404]
		        var msgHeader = "Requested page not found. [404]";
		    } else if (xhr.status >= 500) { //Internal Server Error [500]
		        var msgHeader = "Internal Server Error [500]";
		        var msgDesc = xhr.responseText;
		    } else if (exception === 'parsererror') { //Requested JSON parse failed
		        var msgHeader = "Response Parsing Error (Invalid JSON)";
		        var msgDesc = xhr.responseText;
		    } else if (exception === 'timeout') { //Server Timeout - Check Connection
		        var msgHeader = "Server Timeout Error";
		    } else if (exception === '') { //Server Aborted request
		        var msgHeader = "Server Aborted Request";
		    } else { //Unknown Error
		        var msgHeader = "Unknown Error";    
		        //xhr.responseText               
		    }
		    
		    var logs = JSLog.Logs['App.Login'];
		    var innerHTML = "<ol>";
		    var planeLogs = ""; 
		    for (var i = 0, len = logs.length; i < len; i++) {
		    	innerHTML += "<li>" +logs[i] + "</li>";
		    	// planeLogs is required so tha tags are not included in the text for email. Required to add HTML in email.
		    	planeLogs += logs[i];
	        }
		    innerHTML += "</ol>"
		    
		    $('#ajax-error-modal .modal-body .content-header').text(msgHeader);
		    $('#ajax-error-modal .modal-body .content-body').text(msgDesc);
		    $('#ajax-error-modal .modal-body .content-logs').html(innerHTML);
		    $('#ajax-error-modal .modal-footer .mailToAdmin').click(function() {
		    	var ccEmails = "";
		    	emailConfig.cc.map(function(element){
		    		ccEmails += "&cc="+element;
		    	})
		    	var email = "mailto:"+emailConfig.adminEmail+"?subject="+emailConfig.subject+ ccEmails + "&body="+planeLogs;
		    	location.href=email;
		    });
		    $('#ajax-error-modal').modal();
		    logger.info(msgTitle + '\n\n' + msgDesc);
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
			  debugMode: true,
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
	
	function setHeaderOptions(updateHeader, showHomeLink, showBackLink) {
		if (updateHeader)
			HeaderView.setHeaderMenu();
		
		HeaderView.setHomeIcon(showHomeLink);
		HeaderView.setBackIcon(showBackLink);
	}	
	
	function transitionAppPanel(newPanelId, callback) {
			
			if(this.currentPanelId == -1)  //First time
			{	
				$(newPanelId).show();
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
				var itemWidth = $("#bb-container").width();
				$("#panel-container").width(itemWidth * $('.panel-item').length);
				$('.panel-item').width(itemWidth);
				$("#panel-container").css("transform","translate3d("+$(newPanelId).attr("data-order") * -itemWidth+"px,0,0)");
				$("#panel-container").css("-webkit-transform","translate3d("+$(newPanelId).attr("data-order") * -itemWidth+"px,0,0)");
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