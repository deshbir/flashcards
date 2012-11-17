AppView = new function() {

	var router = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'home':'home'
	    },	    
	    home : function() {
	    	AppView.initialize();
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		TemplateManager.get('app-static', 
			function(template){
				$("#main-body").append(template);
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};