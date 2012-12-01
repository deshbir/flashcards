DisciplineView = new function() {

	/* ----- Global View Variables ----------------------*/
	var listbbView = null;
	var detailbbView = null;
	/* -------------------------------------------------*/

	var mainApp = com.compro.application.hsc;
	var clsMainHeader = mainApp.clsMainHeader;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'discipline':'disciplinelist',
	      'discipline/:displineId':'disciplinehome'
	    },	    
	    
	    disciplinelist : function() {
	    	
			if (listbbView == null) {  //First OR After Browser Refresh
				
				listbbView = new View();
				
			} else {  	 //If the View has been created (bbView) never re-create
				
				listbbView.render();
			}
	    },

	    disciplinehome : function(displineId) {
	    	
	    	
			if (detailbbView == null) { //First OR After Browser Refresh
				
				detailbbView = new DetailView({displineId:displineId});
				
			} else {  	 //If the View has been created (bbView) never re-create
				
				detailbbView.loadCollection(displineId);
				detailbbView.collection.fetch({
					success: function(){
						detailbbView.render();
					}
				});
			}
	    }
	    
	});
	
	var View = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#panel_discipline-list",
		/*------------------------------------------------------*/		
	
		events: {
		},
		
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			this.template_body="";
			/* ------------------------------------------------------------------------*/
			
			this.loadCollection();
			
			//Fill Templates
			var that = this;
			TemplateManager.get('header', 
				function(template){
					that.template_header = template;
						
					TemplateManager.get('discipline-list', 
						function(template){
							that.template_body = template;
							that.collection.fetch({
								success: function(){							
									//Always call render from initialize - as Backbone does not automatically call it.
									that.render();
								}
							});		
					});
			});
		},
		
		loadCollection: function()	{
			this.collection = DisciplineCollection.get();	
		},
		
		render : function() {
			
			var compiled_template_header = Mustache.render(this.template_header, {"user": true, "home": "", "disciplines": "active", "products": ""});
			$(clsMainHeader).html(compiled_template_header);

			var compiled_template_body = Mustache.render(this.template_body, this.collection.toJSON());
			$(this.myPanelId).html(compiled_template_body);			
			this.setElement("#discipline-list");
			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			mainApp.transitionAppPanel(this.myPanelId);

			return this; //Do this at the end to allow for method chaining.			
		}
	});
	
	var DetailView = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#panel_discipline-home",
		/*------------------------------------------------------*/		
			
		template_header: "",
		template_body: "",
		last_discipline_id: -1,
		
		events: {
			"click .disciplinebox"	:	"disciplinebox"
		},
		
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			this.template_body="";
			this.current_discipline_id=-1;
			this.requested_discipline_id=-1;
			/* ------------------------------------------------------------------------*/
			
			this.loadCollection(this.options.displineId);

			//Fill Templates
			var that = this;
			TemplateManager.get('header', 
				function(template){
					that.template_header = template;
						
					TemplateManager.get('product-list', 
						function(template){
							that.template_body = template;
							that.collection.fetch({
								success: function(){							
									//Always call render from initialize - as Backbone does not automatically call it.
									that.render();
								}
							});
					});
			});
		},
		
		loadCollection: function(discipline_id)	{
			
			this.requested_discipline_id=discipline_id;
			
			if(this.current_discipline_id!=this.requested_discipline_id)	{
				
				this.collection = DisciplineCollection.get(this.requested_discipline_id);
			}	
		},		
		
		render : function() {
			
			var compiled_template_header = Mustache.render(this.template_header, {"user": true, "home": "", "disciplines": "", "products": "active"});
			$(clsMainHeader).html(compiled_template_header);
			
			// Check if we need to update the PANEL HTML - 
			// if we're back the same/previous product, then do NOT re-create the DOM
			if(this.current_discipline_id!=this.requested_discipline_id)	{			
				var compiled_template_body = Mustache.render(this.template_body, this.collection.toJSON());
				$(this.myPanelId).html(compiled_template_body);			
				this.setElement("#product-list");
				
				this.current_displine_id=this.requested_discipline_id;
			}
			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			mainApp.transitionAppPanel(this.myPanelId);
			
			return this; //Do this at the end to allow for method chaining.			
			
		},
		disciplinebox : function(e) {
			var disciplineid = this.options.displineId;
			var productid = e.currentTarget.id;
			Backbone.history.navigate("#/discipline/" + disciplineid + "/product/"+productid);			
		}
	});
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};