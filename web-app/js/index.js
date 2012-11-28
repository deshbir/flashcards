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
	
	/*
	TODO
	1. Can we assume that these DOM element are initializaed by this time
	2. Exception handling - do not allow code to proceed, if any of these depencies
	   are not present.
	*/
		
	/********************************************************/
	/*                 PRIVATE MEMBERS                     */
	/********************************************************/
	
	// Config for plug
	var config = {
	};
	
	//Global Flashcards holder (object of SwipeJs)
	var flashcards;
	
	
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
	
	
	function transitionAppPanel(newPanelId) {
		
		if(this.currentPanelId == -1)  //First time
		{	
			$(newPanelId).show();
		}
		else
		{
			$(this.currentPanelId).hide();
			
			if ( $(this.currentPanelId).attr("data-order") < $(newPanelId).attr("data-order")) {
				$(newPanelId).show("slide", { direction: "right" }, 300);	
			} else{ 
				$(newPanelId).show("slide", { direction: "left" }, 300);
			}

		}
		
		this.currentPanelId = newPanelId
		
	}
		
	/********************************************************/
	/*                 ONE TIME INIT FUNCTION              */
	/********************************************************/

	(function init()	{
			$(document).ready(function() {
				backbone_init_routers();
				backbone_start_navigation();
				soundmanager2_init();
			});

					
	})();

	/********************************************************/
	/*                 Public   */
	/********************************************************/

	return	{
		"config":config,
		"flashcards":flashcards,
		"idTopContainer" : idTopContainer,
		"clsMainHeader" : clsMainHeader,
		"currentPanelId" : currentPanelId,
		"transitionAppPanel" : transitionAppPanel
	}

})();