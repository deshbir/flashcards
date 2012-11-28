DisciplineView = new function() {

	var listbbView = null;
	var detailbbView = null;
	
	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'discipline':'disciplinelist',
	      'discipline/:displineId':'disciplinehome'
	    },	    
	    
	    disciplinelist : function() {
			if (listbbView == null) {
				listbbView = new View();
			} else {
				listbbView.render();
			}
	    },

	    disciplinehome : function(displineId) {
			if (detailbbView == null) {
				detailbbView = new DetailView({displineId:displineId});
			} else {	    		
				detailbbView.loadCollection(displineId);
				detailbbView.render();
			}
	    }
	    
	});
	
	var View = Backbone.View.extend({
		myPanelId:"#panel_discipline-list",
		
		template_header: "",
		template_body: "",
		
		events: {
		},
		initialize: function() {
			this.loadCollection();
			//Fill Templates
			var that = this;
			TemplateManager.get('header', 
				function(template){
					template_header = template;
						
					TemplateManager.get('discipline-list', 
						function(template){
							template_body = template;
							
							//Always call render from initialize - as Backbone does not automatically call it.
							that.render();
					});
			});
		},
		
		loadCollection: function()	{
				this.collection = DisciplineCollection.get();
				this.collection.fetch();	
		},
		
		render : function() {
			var compiled_template_header = Mustache.render(template_header, {"user": true, "home": "", "disciplines": "active", "products": ""});
			$(clsMainHeader).html(compiled_template_header);

			var compiled_template_body = Mustache.render(template_body, this.collection.toJSON());
			$(this.myPanelId).html(compiled_template_body);			
			this.setElement("#discipline-list");
			
			var currentpanel = com.compro.application.hsc.currentPanelId;
			if (currentpanel != null)
				$(currentpanel).hide();

			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			if ( $(currentpanel).attr("data-order") < $(this.myPanelId).attr("data-order")) {
				$(this.myPanelId).show("slide", { direction: "right" }, 500);
			} else{ 
				$(this.myPanelId).show("slide", { direction: "left" }, 500);
			}			
			
			//setting current panel to current view id
			com.compro.application.hsc.currentPanelId = this.myPanelId
			return this; //Do this at the end to allow for method chaining.			
		}
	});
	
	var DetailView = Backbone.View.extend({
		myPanelId:"#panel_discipline-home",
		
		template_header: "",
		template_body: "",
		last_discipline_id: -1,
		events: {
		},
		initialize: function() {
			this.loadCollection(this.options.displineId);

			//Fill Templates
			var that = this;
			TemplateManager.get('header', 
				function(template){
					template_header = template;
						
					TemplateManager.get('product-list', 
						function(template){
							template_body = template;
							
							//Always call render from initialize - as Backbone does not automatically call it.
							that.render();
					});
			});
		},
		loadCollection: function(discipline_id)	{
			if(this.last_discipline_id!=discipline_id)	{
				this.last_discipline_id=discipline_id;
				
				this.collection = DisciplineCollection.get(this.last_discipline_id);
				this.collection.fetch();
			}	
		},		
		render : function() {
			
			var compiled_template_header = Mustache.render(template_header, {"user": true, "home": "", "disciplines": "", "products": "active"});
			$(clsMainHeader).html(compiled_template_header);
			
			var compiled_template_body = Mustache.render(template_body, this.collection.toJSON());
			$(this.myPanelId).html(compiled_template_body);			
			this.setElement("#product-list");
			
			var currentpanel = com.compro.application.hsc.currentPanelId;
			if (currentpanel != null)
				$(currentpanel).hide();

			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			if ( $(currentpanel).attr("data-order") < $(currentpanel).attr("data-order")) {
				$(this.myPanelId).show("slide", { direction: "right" }, 500);	
			} else{ 
				$(this.myPanelId).show("slide", { direction: "left" }, 500);
			}			
			
			//setting current panel to current view id
			com.compro.application.hsc.currentPanelId = this.myPanelId
			return this; //Do this at the end to allow for method chaining.			
			
		}
	});
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};