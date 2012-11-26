ProductView = new function() {

	var router = null;
	var currentView = null;
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
	
	var View = Backbone.View.extend({
		events: {
			"click .flashcardAssess"	:	"flashcardassess"
		},
		initialize: function() {
			this.collection = ProductCollection.get(this.options.displineId, this.options.productId);
			//binding view object (this) as an arguments to the listed functions.
		    _.bindAll(this, 'flashcardassess','fillTemplate');
		    this.collection.bind('reset',this.fillTemplate);
			this.collection.fetch();
			this.render();
		},
		render : function() {
			TemplateManager.get('header', 
				function(template){
					var templateHTML = Mustache.render(template, {"user": true, "home": "", "disciplines": "", "products": "active"});
					$(clsMainHeader).html(templateHTML);
			});
		},
		fillTemplate :  function() {
			var collection = this.collection;
			var view = this;
			$(idTopContainer).html("");
			TemplateManager.get('product-home', 
					function(template){
						var compiledTemplate = Mustache.render(template, collection.toJSON());
						$(idTopContainer).append(compiledTemplate);
						soundManager.onready(function() {
							  pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
						});
						view.setElement("#product-home");
			});
		},
		flashcardassess : function(e) {
			var productid = this.options.productId;
			var testid = e.target.id;
			Backbone.history.navigate("#/product/" + productid + "/test/"+testid);
		}
	});

	this.initialize = function(displineId, productId){
		if (router == null) {
			router = new Router();
		}
		
		if (currentView == null) {
			currentView = new View({displineId:displineId,productId:productId});
		} else {
			currentView.render();
		}
	};
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};