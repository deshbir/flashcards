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
		    
		    alert(msgTitle + '\n\n' + msgDesc);
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
			
			if ( $(this.currentPanelId).attr("data-order") < $(newPanelId).attr("data-order")) {
				$(this.currentPanelId).hide("slide", { direction: "left" }, 150, function() {
					$(newPanelId).show("slide", { direction: "right" }, 150, function() {
						
						if(!(typeof callback === 'undefined') )	{
							callback();	
						}						
						
					});					
				});
			} else{ 
				$(this.currentPanelId).hide("slide", { direction: "right" }, 150,  function() {
					$(newPanelId).show("slide", { direction: "left" }, 150, function()	{
						
						if(!(typeof callback === 'undefined') )	{
							callback();	
						}
						
					});
				});
			}
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
				
				logger.info("On Ready - Completed Initialization");
			});

					
	})();

	/********************************************************/
	/*                 Public   */
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