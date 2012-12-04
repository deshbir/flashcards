TestView = new function() {

	/* ----- Global View Variables ----------------------*/
	var bbTestView = null;
	var bbTrainView = null;
	/* -------------------------------------------------*/
	
	var mainApp = com.compro.application.hsc;
	var clsMainHeader = mainApp.clsMainHeader;
	
	
	var Router = Backbone.Router.extend({
		routes: {
	      'product/:productId/test/:testId':'testhome',
	      'product/:productId/testtraining/:testId':'testtrain'
	    },	    
	    
	    testhome : function(productId, testId) {
			
			if (bbTestView == null) { //First OR After Browser Refresh
				
				bbTestView = new View({productId:productId,testId:testId});
			
			} else { //If the View has been created (bbView) never re-create
				
				bbTestView.loadCollection(productId,testId);
				bbTestView.collection.fetch({
					success: function(){
						bbTestView.render();
					}
				});				
			}
	    },
	    
	    testtrain : function(productId, testId) {
			
			if (bbTrainView == null) { //First OR After Browser Refresh
				
				bbTrainView = new TrainView({productId:productId,testId:testId});
			
			} else { //If the View has been created (bbView) never re-create
				
				bbTrainView.loadCollection(productId,testId);
				bbTrainView.collection.fetch({
					success: function(){
						bbTrainView.render();
					}
				});				
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
			this.current_mode="";
			this.requested_product_id=-1;
			this.requested_test_id=-1;
			this.requested_mode="asses";
			/* ------------------------------------------------------------------------*/			
			
			this.loadCollection(this.options.productId,this.options.testId);
			
			//Fill Templates
			var that = this;					
			TemplateManager.get('test-home', 
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
		loadCollection: function(product_Id,test_Id, mode)	{

			this.requested_mode=mode;
			this.requested_product_id=product_Id;
			this.requested_test_id=test_Id;
			
			if(this.current_product_id!=this.requested_product_id || this.current_test_id!=this.requested_test_id)	{				
				this.collection = TestCollection.get(this.requested_product_id,this.requested_test_id);
			}
		},		
		render : function() {
			
			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */
			mainApp.setHeaderOptions(false, true, true);
			
			// Check if we need to update the PANEL HTML - 
			// if we're back the same/previous product, then do NOT re-create the DOM		
			if(this.current_product_id!=this.requested_product_id || this.current_test_id!=this.requested_test_id || this.current_mode!=this.requested_mode)	{			

				var compiled_template_body = Mustache.render(this.template_body, this.collection.toJSON());
				$(this.myPanelId).html(compiled_template_body);
				this.setElement("#test-home");
				
				this.current_product_id=this.requested_product_id;
				this.current_test_id=this.requested_test_id;
				this.current_mode="asses";
			}
			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			mainApp.transitionAppPanel(this.myPanelId, function() {
				$("#body-set > .body").css("display", "block");
				mainApp.flashcards = new Swipe(document.getElementById('flashcard'), {"containersequence":1});			
			});
			
			
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
			$(e.target).find("span.radio").toggleClass("radio-on radio-off");
		}
	});	

	
	var TrainView = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#panel_test-home",
		/*------------------------------------------------------*/

		events: {
			"click .next"	:	"nextQuestion",
			"click .previous"	:	"prevQuestion",
			"click .onlyQuestion"	:	"showOnlyQuestion",
			"click .onlyAnswer"	:	"showOnlyAnswer",
			"click .bothQuestionAnswer"	:	"showQuestionAnswer"
		},
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			this.template_body="";
			this.current_product_id=-1;
			this.current_test_id=-1;
			this.current_mode="";
			this.requested_product_id=-1;
			this.requested_test_id=-1;
			this.requested_mode="training";
			/* ------------------------------------------------------------------------*/			
			
			this.loadCollection(this.options.productId,this.options.testId);
			
			//Fill Templates
			var that = this;					
			TemplateManager.get('test-train', 
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
		loadCollection: function(product_Id,test_Id, mode)	{

			this.requested_mode=mode;
			this.requested_product_id=product_Id;
			this.requested_test_id=test_Id;
			
			if(this.current_product_id!=this.requested_product_id || this.current_test_id!=this.requested_test_id)	{				
				this.collection = TestCollection.get(this.requested_product_id,this.requested_test_id);
			}
		},		
		render : function() {
			
			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */
			mainApp.setHeaderOptions(false, true, true);
			
			// Check if we need to update the PANEL HTML - 
			// if we're back the same/previous product, then do NOT re-create the DOM		
			if(this.current_product_id!=this.requested_product_id || this.current_test_id!=this.requested_test_id || this.current_mode!=this.requested_mode)	{			

				var compiled_template_body = Mustache.render(this.template_body, this.collection.toJSON());
				$(this.myPanelId).html(compiled_template_body);
				this.setElement("#test-train");
				
				this.current_product_id=this.requested_product_id;
				this.current_test_id=this.requested_test_id;
				this.current_mode="training";
			}
			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			mainApp.transitionAppPanel(this.myPanelId, function() {
				$("#body-set > .body").css("display", "block");
				mainApp.flashcards = new Swipe(document.getElementById('flashcard'), {"containersequence":1});	
				//$("#test-train .onlyQuestion").trigger('click');
			});
			
			
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
		showOnlyQuestion: function() {
			var element = "#" + $(this.el).attr('id');
			$(element + " .question").show()
			$(element + " .answer").hide()
			$(element + " .explainanswer").hide()
			return false;
		},
		showOnlyAnswer: function(e){
			var element = "#" + $(this.el).attr('id');
			$(element + " .question").hide()
			$(element + " .answer").show()
			$(element + " .explainanswer").show()			
			return false;
		},
		showQuestionAnswer: function(e){
			var element = "#" + $(this.el).attr('id');
			$(element + " .question").show()
			$(element + " .answer").show()
			$(element + " .explainanswer").show()			
			return false;
		}		
	});
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};
