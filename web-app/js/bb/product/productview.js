ProductView = new function() {

	var bbView = null;

	var idTopContainer = com.compro.application.hsc.idTopContainer;
	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	var pagePlayer = new PagePlayer();
	
	
	var Router = Backbone.Router.extend({
		routes: {
	      'discipline/:displineId/product/:productId':'producthome'
	    },	    
	    
	    producthome : function(displineId, productId) {
	    	
	    	if (bbView == null) {  //First OR After Browser Refresh 
	    		bbView = new View({displineId:displineId,productId:productId});
			} 
	    	else {
	    		
				bbView.loadCollection(displineId,productId);
				bbView.render();
			}
	    }
	    
	});
	
	var View = Backbone.View.extend({
		
		myPanelId:"#panel_product-home",
		
		template_header: "",
		template_body: "",
		
		last_discipline_id: -1,
		last_product_id: -1,

		
	
		
		events: {
			"click .flashcardAssess"	:	"flashcardassess"
		},
		
		
		initialize: function() {
			
			this.loadCollection(this.options.displineId,this.options.productId);
			
			//Fill Templates
			var that = this;
			TemplateManager.get('header', 
				function(template){
					template_header = template;
					
					TemplateManager.get('product-home', 
						function(template){
							template_body = template;
							
							//Always call render from initialize - as Backbone does not automatically call it.
							that.render();
					});
			});
		},
		
		loadCollection: function(discipline_id, product_id)	{
			
			if(this.last_discipline_id!=discipline_id || this.last_product_id!=product_id)	{				
				this.collection = ProductCollection.get(discipline_id, product_id);
				this.collection.fetch();
			}
			
		},
		
		render: function() {

			var compiled_template_header = Mustache.render(template_header, {"user": true, "home": "", "disciplines": "", "products": "active"});
			$(clsMainHeader).html(compiled_template_header);
			
			//$(idTopContainer).html("");
			if(this.last_discipline_id!=this.options.displineId || this.last_product_id!=this.options.productId)	{
				this.last_discipline_id=this.options.displineId;
				this.last_product_id=this.options.productId;				
				//DO NOT OVERRIDE HTML IN THE TEMPLATE
				var compiled_template_body = Mustache.render(template_body, this.collection.toJSON());
				$(this.myPanelId).html(compiled_template_body);
				soundManager.onready(function() {
					  pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
				});
				this.setElement("#product-home");
			}
			var currentpanel = com.compro.application.hsc.currentPanelId;
			$(currentpanel).hide();

			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			if ( $(currentpanel).attr("data-order") < $(currentpanel).attr("data-order")) {
				$(this.myPanelId).show("slide", { direction: "right" }, 500);	
			} else{ 
				$(this.myPanelId).show("slide", { direction: "left" }, 500);
			}
			//setting current panel to current view id
			com.compro.application.hsc.currentPanelId = this.myPanelId
			
			return this; //Do this at the end to allow for method chaining.
		},

		flashcardassess : function(e) {
			var productid = this.options.productId;
			var testid = e.target.id;
			Backbone.history.navigate("#/product/" + productid + "/test/"+testid);
		}
	});

	this.routerInitialize = function(){
		
		if (this.router == null) {
			this.router = new Router();
		}
	};
};