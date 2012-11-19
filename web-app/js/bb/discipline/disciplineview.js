DisciplineView = new function() {

	var router = null;
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
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		$(idTopContainer).html("");
		
		TemplateManager.get('header', 
				function(template){
			 		var templateHTML = Mustache.render(template, {"user": true, "home": "active", "disciplines": "", "products": ""});
					$(clsMainHeader).html(templateHTML);
		});
		
		DisciplineCollection.get().fetch({
			success: function(){
				TemplateManager.get('discipline-list', 
					function(template){
					
					var compiledTemplate = Mustache.render(template, DisciplineCollection.get().toJSON());
					$(idTopContainer).append(compiledTemplate);
				});
			}		
		});		
		
	};

	this.disciplineinitialize = function(displineId){
		if (router == null) {
			router = new Router();
		}
		
		$(idTopContainer).html("");
		
		TemplateManager.get('header', 
				function(template){
			 		var templateHTML = Mustache.render(template, {"user": true, "home": "", "disciplines": "active", "products": ""});
					$(clsMainHeader).html(templateHTML);
		});
			
		DisciplineCollection.get(displineId).fetch({
			success: function(model){
				TemplateManager.get('product-list', 
					function(template){
						var compiledTemplate = Mustache.render(template, model.toJSON());
						$(idTopContainer).append(compiledTemplate);
					});
			}
		});
		
	};
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};