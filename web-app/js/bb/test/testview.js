TestView = new function() {

	var bbTestView = null;
	var idTopContainer = com.compro.application.hsc.idTopContainer;
	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	
	
	var Router = Backbone.Router.extend({
		routes: {
	      'product/:productId/test/:testId':'testhome'
	    },	    
	    
	    testhome : function(productId, testId) {
			if (bbTestView == null) {
				bbTestView = new View({productId:productId,testId:testId});
			} else {
				bbTestView.render({el: idTopContainer});
			}
	    }
	    
	});

	var View = Backbone.View.extend({
		myPanelId:"#panel_test-home",
		
		template_header: "",
		template_body: "",		
		last_product_Id: -1,
		last_test_Id: -1,
		
		events: {
			"click .next"	:	"nextQuestion",
			"click .previous"	:	"prevQuestion",
			"click .resize"	:	"resizeContainer",
			"click .radio-control"	:	"switchRadioState"
		},
		initialize: function() {
			this.loadCollection(this.options.productId,this.options.testId);
			
			//Fill Templates
			var that = this;
			TemplateManager.get('header', 
				function(template){
					template_header = template;
						
					TemplateManager.get('test-home', 
						function(template){
							template_body = template;
							
							//Always call render from initialize - as Backbone does not automatically call it.
							that.render();
					});
			});
		},
		loadCollection: function(product_Id,test_Id)	{
			
			if(this.last_product_Id!=product_Id || this.last_test_Id!=test_Id)	{				
				this.collection = TestCollection.get(product_Id,test_Id);
				this.collection.fetch();
			}	
		},		
		render : function() {
			
			var compiled_template_header = Mustache.render(template_header, {"user": true, "home": "", "disciplines": "active", "products": ""});
			$(clsMainHeader).html(compiled_template_header);
			
			if(this.last_product_Id!=this.options.productId || this.last_test_Id!=this.options.testId)	{			
				this.last_product_Id=this.options.productId;
				this.last_test_Id=this.options.testId;
				
				var compiled_template_body = Mustache.render(template_body, this.collection.toJSON());
				$(this.myPanelId).html(compiled_template_body);
				this.setElement("#test-home");
			}
			var currentpanel = com.compro.application.hsc.currentPanelId;
			$(currentpanel).hide();

			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			if ( $(currentpanel).attr("data-order") < $(this.myPanelId).attr("data-order")) {
				$(this.myPanelId).show("slide", { direction: "right" }, 500);	
			} else{ 
				$(this.myPanelId).show("slide", { direction: "left" }, 500);
			}
			
			$("#body-set > .body").css("display", "block");
			com.compro.application.hsc.flashcards = new Swipe(document.getElementById('flashcard'), {"containersequence":1});
			
			//setting current panel to current view id
			com.compro.application.hsc.currentPanelId = this.myPanelId
			
			return this; //Do this at the end to allow for method chaining.			
		},
		nextQuestion: function() {
			com.compro.application.hsc.flashcards.next();
			return false;
		},
		prevQuestion: function() {
			com.compro.application.hsc.flashcards.prev();
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