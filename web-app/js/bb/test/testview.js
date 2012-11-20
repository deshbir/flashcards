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
		
		TemplateManager.get('test-home', 
				function(template){
			 		var templateHTML = Mustache.render(template, {"user": true, "home": "", "disciplines": "", "products": "active"});
					$(clsMainHeader).html(templateHTML);
		});
	};
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};