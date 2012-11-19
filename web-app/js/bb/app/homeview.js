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
		
		$(idTopContainer).html("");
		
		TemplateManager.get('splash', 
			function(template){
				$(idTopContainer).append(template);
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};