TestView = new function() {

	var router = null;
	var currentView = null;
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

	var View = Backbone.View.extend({
		el: idTopContainer,
		events: {
			"click .next"	:	"nextQuestion",
			"click .previous"	:	"prevQuestion",
			"click .resize"	:	"resizeContainer"
		},
		initialize: function(productId, testId) {
			this.collection = TestCollection.get(productId, testId);
			this.collection.fetch();
			//binding view object (this) as an arguments to the listed functions.
		    _.bindAll(this, 'nextQuestion', 'prevQuestion','resizeContainer','fillTemplate');
			//binding collection update with functions
			//this.collection.bind('add',this.addOne);
		    this.collection.bind('reset',this.fillTemplate);
		    this.render();
			
		},
		render : function() {
			TemplateManager.get('header', 
					function(template){
				 		var templateHTML = Mustache.render(template, {"user": true, "home": "", "disciplines": "active", "products": ""});
						$(clsMainHeader).html(templateHTML);
			});
		},
		
		fillTemplate: function() {
			var collection = this.collection;
			$(idTopContainer).html("");
			TemplateManager.get('test-home', 
				function(template){
					var compiledTemplate = Mustache.render(template, collection.toJSON());
					$(idTopContainer).append(compiledTemplate);
				});
				$("#body-set > .body").css("display", "block");
				com.compro.application.hsc.flashcards = new Swipe(document.getElementById('flashcard'), {"containersequence":1});
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
		}
	});	
	
	this.initialize = function(productId, testId){
		if (router == null) {
			router = new Router();
		}
		if (currentView == null) {
			currentView = new View(productId, testId);
		} else {
			currentView.render({el: idTopContainer});
		}
	};
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};