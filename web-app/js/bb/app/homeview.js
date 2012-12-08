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
			"click #login-button"	:	"userlogin",
			"click #logout-button"	:	"userlogout"
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
		render : function() {
			var compiled_template_body = Mustache.render(this.template_splash);
			$(this.myPanelId).html(compiled_template_body);
			var view = this;
			if(mainApp.userinfo.loggedin){
				UserModel.get().fetch({
					success: function(model, response){
						mainApp.userinfo.name = model.get("username");
						mainApp.userinfo.email =  model.get("email");
						var compiledTemplate = Mustache.render(view.template_body_home, {"facebookuser":mainApp.userinfo.facebookuser,"loggedin": mainApp.userinfo.loggedin, "username": mainApp.userinfo.name, "email":  mainApp.userinfo.email} );
						$("#loginform").html(compiledTemplate);
						
						/*
						 * 1st parameter - update header for login
						 * 2nd parameter - showHomeLink
						 * 3rd parameter - setBackLink 
						 * 4th parameter - showLogoutIcon
						 */
						mainApp.setHeaderOptions(true, false, false, false);
					}
				});
			} else {
				var compiledTemplate = Mustache.render(view.template_body_home, {"loggedin": mainApp.userinfo.loggedin});
				$("#loginform").html(compiledTemplate);
			}
			this.setElement("#loginform");			
			/*
			 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
			 */
			mainApp.transitionAppPanel(this.myPanelId);
			return this; //Do this at the end to allow for method chaining.		
		},
		userlogin : function() {
			Authenticate.authAjax(); 
			return false;
		},
		userlogout : function() {
			Authenticate.logout();
			return false;
		}	
	});
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};