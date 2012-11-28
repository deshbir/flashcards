HomeView = new function() {

	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'home':'home'
	    },	    
	    home : function() {
	    	HomeView.initialize();
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		
		TemplateManager.get('header', 
				function(template){
			 		var templateHTML = Mustache.render(template, {"user": false});
					$(clsMainHeader).html(templateHTML);
		});
		
		TemplateManager.get('splash', 
			function(template){
				$("#panel_home").html(template);
				/*
				 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
				 */
				com.compro.application.hsc.transitionAppPanel("#panel_home");
		},{cache:false});
				
		//setting current panel to current view id
		com.compro.application.hsc.currentPanelId = $("#panel_home");		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};