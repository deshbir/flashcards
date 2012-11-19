HomeView = new function() {

	var router = null;
	var idTopContainer = com.compro.application.hsc.idTopContainer;
	
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
					$(".nav-collapse").html(templateHTML);
		});
		
		TemplateManager.get('splash', 
			function(template){
				$(idTopContainer).html(template);
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};