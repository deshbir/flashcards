DisciplineView = new function() {

	var router = null;
	var listView = null;
	var detailView = null;
	var idTopContainer = com.compro.application.hsc.idTopContainer;
	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'discipline':'disciplinelist',
	      'discipline/:displineId':'disciplinehome'
	    },	    
	    
	    disciplinelist : function() {
	    	DisciplineView.initialize()
	    },

	    disciplinehome : function(displineId) {
	    	DisciplineView.disciplineinitialize(displineId)
	    }
	    
	});
	
	var View = Backbone.View.extend({
		events: {
		},
		initialize: function() {
			this.collection = DisciplineCollection.get();
			//binding view object (this) as an arguments to the listed functions.
		    _.bindAll(this, 'fillTemplate');
			//binding collection update with functions
			//this.collection.bind('add',this.addOne);
		    this.collection.bind('reset',this.fillTemplate);
			this.collection.fetch();
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
			var view = this;
			$(idTopContainer).html("");
			TemplateManager.get('discipline-list', 
				function(template){					
					var compiledTemplate = Mustache.render(template, collection.toJSON());
					$(idTopContainer).append(compiledTemplate);
			});
			view.setElement("#discipline-list");
		}
	});
	
	var DetailView = Backbone.View.extend({
		events: {
		},
		initialize: function() {
			this.collection = DisciplineCollection.get(this.options.displineId);
			//binding view object (this) as an arguments to the listed functions.
		    _.bindAll(this, 'fillTemplate');
			//binding collection update with functions
			//this.collection.bind('add',this.addOne);
		    this.collection.bind('reset',this.fillTemplate);
			this.collection.fetch();
		    this.render();			
		},
		render : function() {
			TemplateManager.get('header', 
				function(template){
					var templateHTML = Mustache.render(template, {"user": true, "home": "", "disciplines": "", "products": "active"});
					$(clsMainHeader).html(templateHTML);
			});
		},
		
		fillTemplate: function() {
			var collection = this.collection;
			var view = this;
			$(idTopContainer).html("");
			TemplateManager.get('product-list', 
				function(template){
					var compiledTemplate = Mustache.render(template, collection.toJSON());
					$(idTopContainer).append(compiledTemplate);
			});
			view.setElement("#product-list");
		}
	});	
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		if (listView == null) {
			listView = new View();
		} else {
			listView.render();
		}		
	};

	this.disciplineinitialize = function(displineId){
		if (router == null) {
			router = new Router();
		}
		if (detailView == null) {
			detailView = new DetailView({displineId:displineId});
		} else {
			detailView.render();
		}
	};
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};