TestView = new function() {

	var router = null;
	var idTopContainer = com.compro.application.hsc.idTopContainer;
	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'product/:productId/test/:testId':'testhome'
	    },	    
	    
	    testhome : function(productId, testId) {
	    	TestView.initialize(productId, testId)
	    }
	    
	});
	
	this.initialize = function(productId, testId){
		if (router == null) {
			router = new Router();
		}
		
		$(idTopContainer).html("");
		
		TemplateManager.get('header', 
				function(template){
			 		var templateHTML = Mustache.render(template, {"user": true, "home": "", "disciplines": "active", "products": ""});
					$(clsMainHeader).html(templateHTML);
		});
				
		TemplateManager.get('test-home', 
				function(template){
			 		var templateHTML = Mustache.render(template, {"user": true, "home": "", "disciplines": "", "products": "active"});
					$(idTopContainer).append(templateHTML);
		});
		
		com.compro.application.hsc.flashcards = new Swipe($(".flashcard"));
	};
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};