HeaderView = new function() {

	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	
	this.initialize = function(){
		
		View.initialize();
			
	};
	
	this.setActiveMenu(menuId)	{
	
	}
	
	this.setLoggedIn()	{
		
	}
	
	this.setLoggedOut()	{
		
	}
	
	
	var View = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		
		/*------------------------------------------------------*/		
			
		template_header: "",
		
		events: {
			"click .disciplinebox"	:	"disciplinebox"
		},
		
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			/* ------------------------------------------------------------------------*/
			
			//Fill Templates
			var that = this;
			TemplateManager.get('header', 
				function(template){
					that.template_header = template;
			});
		},
		
		
		
		render : function() {
			
			var compiled_template_header = Mustache.render(this.template_header, {"loggedin": mainApp.userinfo.loggedin,"home": "", "disciplines": "", "products": "active"});
			$(clsMainHeader).html(compiled_template_header);
			
			return this; //Do this at the end to allow for method chaining.			
			
		}
		
	});
		
};