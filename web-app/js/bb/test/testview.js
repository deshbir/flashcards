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
				
		TestCollection.get(productId, testId).fetch({
			success: function(model){
				TemplateManager.get('test-home', 
					function(template){
					
					var compiledTemplate = Mustache.render(template, model.toJSON());
					$(idTopContainer).append(compiledTemplate);
				});
				$("#body-set > .body").css("display", "block");
				com.compro.application.hsc.flashcards = new Swipe(document.getElementById('flashcard'), {"containersequence":1});
			}
		});
	};
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};