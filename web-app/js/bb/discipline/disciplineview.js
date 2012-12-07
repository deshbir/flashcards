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
		},
		
		loadCollection: function()	{
			this.collection = DisciplineCollection.get();	
		},
		
		render : function() {
			
			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */
			mainApp.setHeaderOptions(false, true, true);

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

			this.setElement("#discipline-list");
			
			var currentClass="clickbox";
			$(".span4").addClass(currentClass);
			/*
			$(".span4").each(function(index) {
			    $(this).addClass(currentClass);
				if (currentClass ==  "clickbox clickbox-light") {
					currentClass = "clickbox";
				} else {
					currentClass = "clickbox clickbox-light";
				}				    
			});			
			*/
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
		myPanelRowId:"#panel_discipline-home #product-list",
		/*------------------------------------------------------*/		
			
		template_header: "",
		template_body: "",
		last_discipline_id: -1,
		
		events: {
			"click .clickbox"	:	"disciplinebox"
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
						this.resetColumns();
						this.resizeColumns();
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
			mainApp.setHeaderOptions(false, true, true);
			
			// Check if we need to update the PANEL HTML - 
			// if we're back the same/previous product, then do NOT re-create the DOM
			if(this.current_discipline_id!=this.requested_discipline_id)	{
				
				var compiled_template_body = Mustache.render(this.template_body, {"name" : this.collection.first().attributes.name});
				$(this.myPanelId).html(compiled_template_body);
				
				/* ----- Breaking Into 3 column row sets  ----------- */
				var productCollection = this.collection.first().attributes.products;
				var threeitem_lists = _.groupBy(productCollection, function(product){
					return Math.floor((product.sequence-1)/3); 
				});
				
				/* ----- Appending Rows (3 columns)  ----------- */
				that = this;
				_.each(threeitem_lists, function(num, key){
					
					var compiled_template_body_row = Mustache.render(that.template_body_row, num);
					$(that.myPanelRowId).append(compiled_template_body_row);
					
				});
				
				this.setElement("#product-list");
				
				this.current_displine_id=this.requested_discipline_id;
				
				var currentClass="clickbox";
				$(".span4").addClass(currentClass);
				/*
				$(".span4").each(function(index) {
				    $(this).addClass(currentClass);
					if (currentClass ==  "clickbox clickbox-light") {
						currentClass = "clickbox";
					} else {
						currentClass = "clickbox clickbox-light";
					}				    
				});*/	
			}
			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			var that=this;
			mainApp.transitionAppPanel(this.myPanelId,function(){
				that.resizeColumns();
			});
			
			
			return this; //Do this at the end to allow for method chaining.			
			
		},
		disciplinebox : function(e) {
			var disciplineid = this.options.displineId;
			var productid = e.currentTarget.id;
			Backbone.history.navigate("#/discipline/" + disciplineid + "/product/"+productid);			
		},
		resizeColumns:function(){
				$(".row").each(function(){
					var currentTallest = 0;
					$(this).children().each(function(i){
						$(this).children().each(function(){
							if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
						});
					});
					$(this).children().each(function(){
						if (Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
						// for ie6, set height since min-height isn't supported
						if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'height': currentTallest}); }
						$(this).children().css({'min-height': currentTallest}); 
					});
			    
				});
		},
		resetColumns:function(){
			$(".row").each(function(){
				$(this).children().each(function(){
					if (Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
					// for ie6, set height since min-height isn't supported
					if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'height': ''}); }
					$(this).children().css({'min-height':''}); 
				});
		    
			});
	}
	});
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};
