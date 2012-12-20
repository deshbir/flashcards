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
		myPanelRowId:"#panel_discipline-list #discipline-list",
		/*------------------------------------------------------*/		

		events: {
			"click .clickbox"	:	"disciplinedetail"
		},
		
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			this.template_body="";
			this.template_body_row="";
			/* ------------------------------------------------------------------------*/
			
			this.loadCollection();
			
			//Fill Templates
			var that = this;					
			TemplateManager.get('discipline-list', 
					function(template){
						that.template_body = template;
						
						TemplateManager.get('discipline-list-row', 
							function(template){
								that.template_body_row = template;
								that.collection.fetch({
									success: function(){							
										//Always call render from initialize - as Backbone does not automatically call it.
										that.render();
									}
						});		
					});
			});
			$(window).bind("resize.discipline-list", _.bind(function(){
				if(mainApp.currentPanelId==this.myPanelId){
					mainApp.resetColumns(this.myPanelId+" .row-fluid");
					mainApp.resizeColumns(this.myPanelId+" .row-fluid",false);
					mainApp.onResizeTranslationHandler(mainApp.currentPanelId);
				}
		}, this));
		},
		
		loadCollection: function()	{
			this.collection = DisciplineCollection.get();	
		},
		
		// Updating method name from "render" to "custiomRender" for logging.
		customRender : function() {
			
			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */
			mainApp.setHeaderOptions(true, false, true);

			var compiled_template_body = Mustache.render(this.template_body);
			$(this.myPanelId).html(compiled_template_body);
			
			/* ----- Breaking Into 3 column row sets  ----------- */
			var threeitem_lists = this.collection.groupBy(function(discipline){
				return Math.floor((discipline.get("sequence")-1)/3); 
			});
			
			/* ----- Appending Rows (3 columns)  ----------- */
			that = this;

			_.each(threeitem_lists, function(num, key){				
				var compiled_template_body_row = Mustache.render(that.template_body_row, num);
				$(that.myPanelRowId).append(compiled_template_body_row);
				
			});

			this.setElement(this.myPanelId);

			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			var that = this;
			mainApp.transitionAppPanel(this.myPanelId,function(){
				$('#discipline-list').imagesLoaded(function() {
					mainApp.resizeColumns(that.myPanelId+" .row-fluid",false);
				});		
			});

			return this; //Do this at the end to allow for method chaining.			
		},
		
		disciplinedetail: function(e) {
			var disciplineid = e.currentTarget.id;
			//this.cleanUp();
			Backbone.history.navigate("#/discipline/" + disciplineid);
		}
	});
	
	var DetailView = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#panel_discipline-home",
		myPanelRowId:"#panel_discipline-home #product-list",
		/*------------------------------------------------------*/		
			
		template_header: "",
		template_body: "",
		last_discipline_id: -1,
		
		events: {
			"click .clickbox"	:	"productdetail"
		},
		
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			this.template_body="";
			this.template_body_row="";
			this.current_discipline_id=-1;
			this.requested_discipline_id=-1;
			/* ------------------------------------------------------------------------*/
			
			this.loadCollection(this.options.displineId);

			//Fill Templates
			var that = this;
			TemplateManager.get('product-list', 
				function(template){
					that.template_body = template;					
					TemplateManager.get('product-list-row', 
						function(template){
							that.template_body_row = template;
							that.collection.fetch({
								success: function(){							
									//Always call render from initialize - as Backbone does not automatically call it.
									that.render();
								}
							});
					});
			});
			$(window).bind("resize.discipline", _.bind(function(){
					if(mainApp.currentPanelId==this.myPanelId){
						mainApp.resetColumns(this.myPanelId+" .row-fluid");
						mainApp.resizeColumns(this.myPanelId+" .row-fluid",true);
						mainApp.onResizeTranslationHandler(mainApp.currentPanelId);
					}
			}, this));
		},
		
		loadCollection: function(discipline_id)	{
			this.requested_discipline_id=discipline_id;
			
			if(this.current_discipline_id!=this.requested_discipline_id)	{
				this.collection = DisciplineCollection.get(this.requested_discipline_id);
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
			if(this.current_discipline_id!=this.requested_discipline_id)	{
				
				var compiled_template_body = Mustache.render(this.template_body, {"name" : this.collection.first().attributes.name});
				$(this.myPanelId).html(compiled_template_body);
				
				/* ----- Breaking Into 3 column row sets  ----------- */
				var productCollection = this.collection.first().attributes.products;
				
				var threeitem_lists = _.groupBy(productCollection, function(product){
					if (product.type == "book") {
						product.book = true;
						product.lab = false;
					} else {
						product.book = false;
						product.lab = true;
					}
					return Math.floor((product.sequence-1)/3); 
				});
				
				/* ----- Appending Rows (3 columns)  ----------- */
				that = this;
				_.each(threeitem_lists, function(num, key){
					var compiled_template_body_row = Mustache.render(that.template_body_row, num);
					$(that.myPanelRowId).append(compiled_template_body_row);
					
				});
				
				this.setElement(this.myPanelId);
				
				this.current_displine_id=this.requested_discipline_id;
			}
			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			var that=this;
			mainApp.transitionAppPanel(this.myPanelId,function(){
				$('#product-list').imagesLoaded(function() {
					mainApp.resizeColumns(that.myPanelId+" .row-fluid",true);
				});		
			});	
			return this; //Do this at the end to allow for method chaining.			
			
		},
		productdetail : function(e) {
			var disciplineid = this.requested_discipline_id;
			var productid = e.currentTarget.id;
			//this.cleanUp();
			Backbone.history.navigate("#/discipline/" + disciplineid + "/product/"+productid);
		},
		cleanUp:function() { // for cleaning up view before moving to another view of backbone
			this.undelegateEvents();
			$(this).empty;
			this.unbind();			
		}
	});
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};
