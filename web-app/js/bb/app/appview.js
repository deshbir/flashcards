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
		$("#bb-container").html("");
		
		TemplateManager.get('app-static', 
			function(template){
				$("#bb-container").append(template);
		});
		
	};
	this.routerInitialize = function(){
		router = new Router();   
	};
};