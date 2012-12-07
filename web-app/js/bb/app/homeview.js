HomeView = new function() {
	
	/* ----- Global Variables ----------------------*/
	var mainApp = com.compro.application.hsc;
	var homeView = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'home':'home'
	    },    
	    home : function() {
	    	if (homeView == null) {  //First OR After Browser Refresh
	    		homeView = new View();
			} else {  	 //If the View has been created (bbView) never re-create
				homeView.render();
			}
	    }
	});
	
	var View = Backbone.View.extend({
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#panel_home",
		
		events: {
			"click #login-button"	:	"userlogin"
		},
				
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_splash="";
			this.template_body_home="";
			/* ------------------------------------------------------------------------*/
			
			//Fill Templates
			var that = this;			
			TemplateManager.get('splash', 
				function(template){		
					that.template_splash = template;
					TemplateManager.get('authenticate/home', function(template){
						that.template_body_home = template;
						that.render();
					});
			});	
		},
		userlogin : function(e) {
			Authenticate.authAjax(); 
			return false;
		},
		render : function() {
			
			var compiled_template_body = Mustache.render(this.template_splash);
			$(this.myPanelId).html(compiled_template_body);
						
			var compiled_template_home = Mustache.render(this.template_body_home, {"loggedin": mainApp.userinfo.loggedin, "username": mainApp.userinfo.name, "email": mainApp.userinfo.email});
			$("#loginform").html(compiled_template_home);

			this.setElement("#splash-container");
			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */
			mainApp.setHeaderOptions(true, false, false);
			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			mainApp.transitionAppPanel(this.myPanelId);
			return this; //Do this at the end to allow for method chaining.		
		}
	});
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};