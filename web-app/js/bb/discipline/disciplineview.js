DisciplineView = new function() {

	var router = null;
	var idTopContainer = com.compro.application.hsc.idTopContainer;
	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'discipline':'discipline-list',
	      'discipline/$1':'discipline-home'
	    },	    
	    
	    discipline-list : function() {
	    	DisciplineView.initialize()
	    },

	    discipline-home : function(displineId) {
	    	DisciplineView.initialize(displineId)
	    }
	    
	    
	});
	
	this.initialize = function(){
		if (router == null) {
			router = new Router();
		}
		
		$(idTopContainer).html("");
		
		TemplateManager.get('header', 
				function(template){
			 		var templateHTML = Mustache.render(template, {"user": true});
					$(clsMainHeader).html(templateHTML);
		});
		
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