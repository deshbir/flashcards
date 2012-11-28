TestView = new function() {

	/* ----- Global View Variables ----------------------*/
	var bbTestView = null;
	/* -------------------------------------------------*/
	
	var mainApp = com.compro.application.hsc;
	var clsMainHeader = mainApp.clsMainHeader;
	
	
	var Router = Backbone.Router.extend({
		routes: {
	      'product/:productId/test/:testId':'testhome'
	    },	    
	    
	    testhome : function(productId, testId) {
			
			if (bbTestView == null) { //First OR After Browser Refresh
				
				bbTestView = new View({productId:productId,testId:testId});
			
			} else { //If the View has been created (bbView) never re-create
				
				bbTestView.loadCollection(productId,testId);
				bbTestView.render();
			}
	    }
	    
	});

	var View = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#panel_test-home",
		/*------------------------------------------------------*/

		events: {
			"click .next"	:	"nextQuestion",
			"click .previous"	:	"prevQuestion",
			"click .resize"	:	"resizeContainer",
			"click .radio-control"	:	"switchRadioState"
		},
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			this.template_body="";
			this.current_product_id=-1;
			this.current_test_id=-1;
			this.requested_product_id=-1;
			this.requested_test_id=-1;			
			/* ------------------------------------------------------------------------*/			
			
			this.loadCollection(this.options.productId,this.options.testId);
			
			//Fill Templates
			var that = this;
			TemplateManager.get('header', 
				function(template){
					that.template_header = template;
						
					TemplateManager.get('test-home', 
						function(template){
							that.template_body = template;
							
							//Always call render from initialize - as Backbone does not automatically call it.
							that.render();
					});
			});
		},
		loadCollection: function(product_Id,test_Id)	{

			this.requested_product_id=product_Id;
			this.requested_test_id=test_Id;
			
			if(this.current_product_id!=this.requested_product_id || this.current_test_id!=this.requested_test_id)	{				
				this.collection = TestCollection.get(this.requested_product_id,this.requested_test_id);
				this.collection.fetch();
			}
		},		
		render : function() {
			
			var compiled_template_header = Mustache.render(this.template_header, {"user": true, "home": "", "disciplines": "active", "products": ""});
			$(clsMainHeader).html(compiled_template_header);
			
			// Check if we need to update the PANEL HTML - 
			// if we're back the same/previous product, then do NOT re-create the DOM		
			if(this.current_product_id!=this.requested_product_id || this.current_test_id!=this.requested_test_id)	{			

				var compiled_template_body = Mustache.render(this.template_body, this.collection.toJSON());
				$(this.myPanelId).html(compiled_template_body);
				this.setElement("#test-home");
				
				this.current_product_id=this.requested_product_id;
				this.current_test_id=this.requested_test_id;				
			}
			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			mainApp.transitionAppPanel(this.myPanelId);
			
			$("#body-set > .body").css("display", "block");
			mainApp.flashcards = new Swipe(document.getElementById('flashcard'), {"containersequence":1});			
			
			return this; //Do this at the end to allow for method chaining.			
		},
		nextQuestion: function() {
			mainApp.flashcards.next();
			return false;
		},
		prevQuestion: function() {
			mainApp.flashcards.prev();
			return false;
		},
		resizeContainer: function() {
			return false;
		},
		switchRadioState: function(e){
			$(".options").find("span.radio-on").toggleClass("radio-on radio-off");
			$(e.target).find("span").toggleClass("radio-on radio-off");
		}
	});	

	this.routerInitialize = function(){
		router = new Router();   
	};
};