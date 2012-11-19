DisciplineView = new function() {

	var router = null;
	var idTopContainer = com.compro.application.hsc.idTopContainer;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'discipline':'discipline'
	    },	    
	    discipline : function() {
	    	DisciplineView.initialize()
	    }
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		$(idTopContainer).html("");
		
		DisciplineCollection.get().fetch({
			success: function(){
				TemplateManager.get('discipline-list', 
					function(template){
					
					var compiledTemplate = Mustache.render(template, DisciplineCollection.get().toJSON());
					$(idTopContainer).append(compiledTemplate);
					
					
					/*
					
						DisciplineCollection.get().each(function(model){
							var compiledTemplate = Mustache.render(template, model.toJSON());
							$(idTopContainer).append(compiledTemplate);
						});
					*/	
				});
			}		
		});		
		
	};

	this.routerInitialize = function(){
		router = new Router();   
	};
};