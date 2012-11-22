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
		
	/********************************************************/
	/*                 ONE TIME INIT FUNCTION              */
	/********************************************************/

	(function init()	{
			$(document).ready(function() {
				backbone_init_routers();
				backbone_start_navigation();
				soundmanager2_init();
			});

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
			})( this );
			
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
			
		})();

	/********************************************************/
	/*                 Public   */
	/********************************************************/

	return	{
		"config":config,
		"flashcards":flashcards,
		"idTopContainer" : idTopContainer,
		"clsMainHeader" : clsMainHeader
	}

})();