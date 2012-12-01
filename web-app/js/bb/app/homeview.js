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
				var mainApp = com.compro.application.hsc;			
				$("#panel_home").html(template);
				TemplateManager.get('authenticate/home', function(template){
							var compiledTemplate = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin, "email": "I don't know"} );
							$("#loginform").html(compiledTemplate);
				});
				/*
				 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
				 */
				com.compro.application.hsc.transitionAppPanel("#panel_home");
		});
				
		//setting current panel to current view id
		com.compro.application.hsc.currentPanelId = $("#panel_home");		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};