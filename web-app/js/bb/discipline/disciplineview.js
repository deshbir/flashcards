DisciplineView = new function() {

	var router = null;
	
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
		
		$("#bb-container").html("");
		
		DisciplineCollection.get().fetch({
			success: function(){
				TemplateManager.get('discipline-panel', 
					function(template){
						DisciplineCollection.get().each(function(model){
							var compiledTemplate = Mustache.render(template, model.toJSON());
							$("#bb-container").append(compiledTemplate);
						});
				});
			}		
		});		
		
	};

	this.routerInitialize = function(){
		router = new Router();   
	};
};