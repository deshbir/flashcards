ProductView = new function() {

	var router = null;
	var idTopContainer = com.compro.application.hsc.idTopContainer;
	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	var pagePlayer = new PagePlayer();
	
	var Router = Backbone.Router.extend({
		routes: {
	      'discipline/:displineId/product/:productId':'producthome'
	    },	    
	    
	    producthome : function(displineId, productId) {
	    	ProductView.initialize(displineId, productId)
	    }
	    
	});
	
	

	this.initialize = function(displineId, productId){
		if (router == null) {
			router = new Router();
		}
		
		$(idTopContainer).html("");
		
		TemplateManager.get('header', 
				function(template){
			 		var templateHTML = Mustache.render(template, {"user": true, "home": "", "disciplines": "", "products": "active"});
					$(clsMainHeader).html(templateHTML);
		});
			
		ProductCollection.get(displineId, productId).fetch({
			success: function(model){
				TemplateManager.get('product-home', 
					function(template){
						var compiledTemplate = Mustache.render(template, model.toJSON());
						$(idTopContainer).append(compiledTemplate);
						
						soundManager.onready(function() {
							  pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
						});
						
					});
			}
		});
		
	};
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};