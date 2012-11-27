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
		
		myPanelId:"panel_product_home",
		
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

				this.last_discipline_id=discipline_id;
				this.last_product_id=product_id;
				
				this.collection = ProductCollection.get(this.last_discipline_id, this.last_product_id);
				this.collection.fetch();
			}
			
		},
		
		render: function() {
			
			
			/*
			if(last_discipline_id==discipline_id && last_product_id==product_id)	{
				
				//DO NOT OVERRIDE HTML IN THE TEMPLATE
			}
			*/
			
			var compiled_template_header = Mustache.render(template_header, {"user": true, "home": "", "disciplines": "", "products": "active"});
			$(clsMainHeader).html(compiled_template_header);
			
			$(idTopContainer).html("");
			
			var compiled_template_body = Mustache.render(template_body, this.collection.toJSON());
			$(idTopContainer).append(compiled_template_body);
			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 *    
			 *  if ( $(com.compro.application.hsc.currentPanelId).data-order < $(com.compro.application.hsc.currentPanelId).data-order)
			 *  	slide-in
			 *  else
			 *  	slide-out
			 *  com.compro.application.hsc.currentPanelId = myPanelId
			 * 
			 */
			
			
			soundManager.onready(function() {
				  pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
			});
			
			this.setElement("#product-home");
			
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