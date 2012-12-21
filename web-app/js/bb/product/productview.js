ProductView = new function() {

	/* ----- Global View Variables ----------------------*/
	var bbView = null;
	var pagePlayer = new PagePlayer();
	/* -------------------------------------------------*/
	var pagePlayerPlay = pagePlayer.events.play;
	var mainApp = com.compro.application.hsc;
	pagePlayer.config.updatePageTitle = false;
	pagePlayer.events.play = function(){
		$("#music").show();
		$("#music i").removeClass('icon-pause-hsc');
		$("#music i").addClass('icon-mute-hsc');
		if(mainApp.soundManagerConfig.playText){
			$("#music a").attr('title',mainApp.soundManagerConfig.playText);
		} else {
			$("#music a").attr('title','Playing Audio. Select to pause.');
		}
		mainApp.soundManagerConfig.musicPlaying = true;
		mainApp.soundManagerConfig.musicStopped = false;
		var soundManager = this;
		mainApp.soundManagerConfig.soundManagerObject = soundManager;
		pagePlayerPlay.call(soundManager);
		$("#product-home .sm2_playing i").toggleClass('icon-volume-up icon-pause');
	}
	var pagePlayerPause = pagePlayer.events.pause;
	pagePlayer.events.pause = function(){
		$("#music i").addClass('icon-pause-hsc');
		$("#music i").removeClass('icon-mute-hsc');
		if(mainApp.soundManagerConfig.pauseText){
			$("#music a").attr('title',mainApp.soundManagerConfig.pauseText);
		} else {
			$("#music a").attr('title','Audio Paused. Select to resume.');
		}
		mainApp.soundManagerConfig.musicPlaying = false;
		pagePlayerPause.call(this);
		$("#product-home .sm2_paused i").toggleClass('icon-volume-up icon-pause');
	}
	var pagePlayerResume = pagePlayer.events.resume;
	pagePlayer.events.resume = function(){
		mainApp.soundManagerConfig.musicPlaying = true;
		$("#music i").removeClass('icon-pause-hsc');
		$("#music i").addClass('icon-mute-hsc');
		if(mainApp.soundManagerConfig.playText){
			$("#music a").attr('title',mainApp.soundManagerConfig.playText);
		} else {
			$("#music a").attr('title','Playing Audio. Select to pause.');
		}
		pagePlayerResume.call(this);
		$("#product-home .sm2_playing i").addClass('icon-volume-up');
		$("#product-home .sm2_playing i").addClass('icon-pause'); 
	}
	var pagePlayerStop = pagePlayer.events.stop;
	pagePlayer.events.stop = function(){
		$("#music i").addClass('icon-pause-hsc');
		$("#music i").removeClass('icon-mute-hsc');
		if(mainApp.soundManagerConfig.stopText){
			$("#music a").attr('title',mainApp.soundManagerConfig.stopText);
		} else {
			$("#music a").attr('title','Audio Stopped. Select to play.');
		}
		mainApp.soundManagerConfig.musicPlaying = false;
		mainApp.soundManagerConfig.musicStopped = true;
		$("#product-home .sm2_playing i").removeClass('icon-volume-up');
		$("#product-home .sm2_playing i").removeClass('icon-pause');
		pagePlayerStop.call(this);
	}
	var pagePlayerFinish = pagePlayer.events.finish;
	pagePlayer.events.finish = function(){
		$("#music").hide();
		mainApp.soundManagerConfig.musicPlaying = false;
		mainApp.soundManagerConfig.musicStopped = true;
		$("#product-home .sm2_playing i").removeClass('icon-volume-up');
		$("#product-home .sm2_playing i").removeClass('icon-pause');
		pagePlayerFinish.call(this);
	}
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
			"click .flashcardAssess"	:	"flashcardassess",
			"click .flashcardTraining"	:	"flashcardtraining",
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
							soundManager.onready(function() {
								  pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
							});							
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
		
		// Updating method name from "render" to "custiomRender" for logging.
		customRender: function() {

			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */
			mainApp.setHeaderOptions(false, true, true);
			// Check if we need to update the PANEL HTML - 
			// if we're back the same/previous product, then do NOT re-create the DOM
			if(this.current_discipline_id!=this.requested_discipline_id || this.current_product_id!=this.requested_product_id)	{
				
				var attribs = this.collection.first().attributes;
				if (attribs.type == "book") {
					attribs.book = true;
					attribs.lab = false;
					attribs.thumbnail = mainApp.addSuffixToFilepath(attribs.image, "-thumb1");
				} else {
					attribs.book = false;
					attribs.lab = true;
					attribs.thumbnail = mainApp.addSuffixToFilepath(attribs.image, "-thumb2");
				}
				
				var compiled_template_body = Mustache.render(this.template_body, this.collection.toJSON());
				
				$(this.myPanelId).html(compiled_template_body);
				
				this.setElement("#product-home");
				
				this.current_discipline_id=this.requested_discipline_id;
				this.current_product_id=this.requested_product_id;
			}

			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			mainApp.transitionAppPanel(this.myPanelId);
			if($("#product-home i.icon-pause").length > 0 && !($("#product-home .sm2_playing").length > 0)){
				$("#product-home i.icon-pause").toggleClass('icon-volume-up icon-pause');
			}
			return this; //Do this at the end to allow for method chaining.
		},

		flashcardassess : function(e) {
			var productid = this.requested_product_id;
			var testid = e.currentTarget.id;
			Backbone.history.navigate("#/product/" + productid + "/test/"+testid);
		},
		
		flashcardtraining : function(e) {
			var productid = this.requested_product_id;
			var testid = e.currentTarget.id;
			Backbone.history.navigate("#/product/" + productid + "/testtraining/"+testid);
		}		
	});

	this.routerInitialize = function(){
		
		if (this.router == null) {
			this.router = new Router();
		}
	};
};
