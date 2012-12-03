ProductView = new function() {

	/* ----- Global View Variables ----------------------*/
	var bbView = null;
	var pagePlayer = new PagePlayer();
	/* -------------------------------------------------*/

	
	var mainApp = com.compro.application.hsc;
	var clsMainHeader = mainApp.clsMainHeader;

	
	var Router = Backbone.Router.extend({
		routes: {
	      'discipline/:displineId/product/:productId':'producthome'
	    },	    
	    
	    producthome : function(displineId, productId) {
	    	
	    	if (bbView == null) {  //First OR After Browser Refresh
	    		
	    		bbView = new View({displineId:displineId,productId:productId});
			} 
	    	else { 	 //If the View has been created (bbView) never re-create
	    		
				bbView.loadCollection(displineId,productId);
				bbView.collection.fetch({
					success: function(){
						bbView.render();
					}
				});				
				
			}
	    }
	    
	});
	
	var View = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#panel_product-home",
		/*------------------------------------------------------*/
		
		events: {
			"click .flashcardAssess"	:	"flashcardassess"
		},
		
		
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			this.template_body="";
			this.current_discipline_id=-1;
			this.current_product_id=-1;
			this.requested_discipline_id=-1;
			this.requested_product_id=-1;
			/* ------------------------------------------------------------------------*/
		
			
			this.loadCollection(this.options.displineId,this.options.productId);
			
			//Fill Templates
			var that = this;					
			TemplateManager.get('product-home', 
				function(template){
					that.template_body = template;
					that.collection.fetch({
						success: function(){							
							//Always call render from initialize - as Backbone does not automatically call it.
							that.render();
						}
					});
			});
		},
		
		loadCollection: function(discipline_id, product_id)	{
			
			this.requested_discipline_id=discipline_id;
			this.requested_product_id=product_id;
			
			if(this.current_discipline_id!=this.requested_discipline_id || this.current_product_id!=this.requested_product_id)	{				
				this.collection = ProductCollection.get(this.requested_discipline_id, this.requested_product_id);
			}
			
		},
		
		render: function() {

			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */
			mainApp.setHeaderOptions(false, true, true);			
			
			// Check if we need to update the PANEL HTML - 
			// if we're back the same/previous product, then do NOT re-create the DOM
			if(this.current_discipline_id!=this.requested_discipline_id || this.current_product_id!=this.requested_product_id)	{
				
				var compiled_template_body = Mustache.render(this.template_body, this.collection.toJSON());
				
				$(this.myPanelId).html(compiled_template_body);
				
				this.setElement("#product-home");
				
				this.current_discipline_id=this.requested_discipline_id;
				this.current_product_id=this.requested_product_id;
				
				soundManager.onready(function() {
					  pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
				});
			}

			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			mainApp.transitionAppPanel(this.myPanelId);
			
			return this; //Do this at the end to allow for method chaining.
		},

		flashcardassess : function(e) {
			var productid = this.options.productId;
			var testid = e.currentTarget.id;
			Backbone.history.navigate("#/product/" + productid + "/test/"+testid);
		}
	});

	this.routerInitialize = function(){
		
		if (this.router == null) {
			this.router = new Router();
		}
	};
};