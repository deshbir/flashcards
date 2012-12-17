TestView = new function() {
	

	/* ----- Global View Variables -----------------*/
	var bbTestView = null;
	var bbTrainView = null;
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
				bbTestView.collection.fetch({
					success: function(){
						bbTestView.render();
					}
				});				
			}
	    },
	    	    
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
			mainApp.setHeaderOptions(true, true, true);
			
			// Check if we need to update the PANEL HTML - 
			// if we're back the same/previous product, then do NOT re-create the DOM		
			if(this.current_product_id!=this.requested_product_id || this.current_test_id!=this.requested_test_id || this.current_mode!=this.requested_mode)	{			

				//Getting all the questions
				var questions = this.collection.first().attributes.questions;
				//Shuffling options
				for(var i=0;i<questions.length;i++){
					var optionArray = [];
					for(var j=1;j<=7;j++){
						if(questions[i]["option"+j])
							//Storing options in array
							optionArray.push(questions[i]["option"+j]);
					}
					//Adding new parameter options which stores shuffled options.
					questions[i].options=_.shuffle(optionArray);
				}
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
			var self = this;
			mainApp.transitionAppPanel(this.myPanelId, function() {
				$("#body-set > .body").css("display", "block");
				if(document.activeElement)
					$(document.activeElement).blur();
				window.scrollTo(0, 0);
				mainApp.flashcards = new Swipe(document.getElementById('flashcard'), {"containersequence":1,callback:self.updateQuestionNumber});			
			});
			
			
			return this; //Do this at the end to allow for method chaining.			
		},
		nextQuestion: function() {
			mainApp.flashcards.next();
			//Calling function for IE browsers
			if(mainApp.isIE)
				this.updateQuestionNumber();
			return false;
		},
		prevQuestion: function() {
			mainApp.flashcards.prev();
			//Calling function for IE browsers
			if(mainApp.isIE)
				this.updateQuestionNumber();
			return false;
		},
		updateQuestionNumber:function(){
			$("#current-question-no-home").html(mainApp.flashcards.getPos()+1);
		},
		resizeContainer: function() {
			return false;
		},
		switchRadioState: function(e){
			if(this.timeOutObj){
				clearTimeout(this.timeOutObj);
				this.timeOutObj = null;
			}
			//Dummy settign for correct answer
			var correct = $(e.currentTarget);
			//Getting current clicked div element
			var currentOptionparentDiv = mainApp.flashcards.slides[mainApp.flashcards.index];
			var answered = correct;
			
			$(e.currentTarget).find("i.radio-options").toggleClass("icon-quiz-circle icon-quiz-selected");
			//Calculating correct answer matching text
			var correctAns = this.collection.first().attributes.questions[mainApp.flashcards.getPos()].answer1.trim().toUpperCase();
			if(($(e.currentTarget).find("span").text()).trim().toUpperCase() !=correctAns){
				$(currentOptionparentDiv).find(".options").children().each(function(){
					if($(this).find("span").text().trim().toUpperCase() == correctAns){
						correct = this;
						return false;
					}
				})
			} 
			
			//Clearing already marked ans if any
			this.clearMarkedAnswer(currentOptionparentDiv);
			var self = this;
			//Calling markCorrectAnswer after the delay
			this.timeOutObj = _.delay(function(){self.markCorrectAnswer(correct,answered,currentOptionparentDiv)},500);
		},
		markCorrectAnswer: function(correct,answered,currentOptionparentDiv){
			$(correct).addClass('correct-ans');
			$(correct).find("i.radio-options").attr("class" , "radio-options icon-quiz-correct");
			/*var answerExplanation =$(currentOptionparentDiv).find("div.answer-explanation");
			$(answerExplanation).removeClass("hide");
			$(answerExplanation).children(".explainanswer").text(this.collection.first().attributes.questions[mainApp.flashcards.getPos()].answerDetails)
			*/if(answered!=correct){
				$(answered).addClass('wrong-ans');
				$(answered).find("i.radio-options").toggleClass("icon-quiz-selected icon-quiz-wrong");
			}
			mainApp.onResizeTranslationHandler(mainApp.currentPanelId);
		},
		clearMarkedAnswer: function(currentOptionparentDiv){
			$(currentOptionparentDiv).find('.correct-ans').removeClass('correct-ans');
			$(currentOptionparentDiv).find('.wrong-ans').removeClass('wrong-ans');
			$(currentOptionparentDiv).find('i.icon-quiz-correct').toggleClass("icon-quiz-correct icon-quiz-circle");
			$(currentOptionparentDiv).find('i.icon-quiz-wrong').toggleClass("icon-quiz-wrong icon-quiz-circle");
			/*var answerExplanation =$(currentOptionparentDiv).find("div.answer-explanation");
			$(answerExplanation).addClass("hide");
			$(answerExplanation).children(".explainanswer").text("");*/

		}
	});	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};
