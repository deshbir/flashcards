HomeView = new function() {
	
	/* ----- Global Variables ----------------------*/
	var mainApp = com.compro.application.hsc;
	var homeView = null;
	
	var Router = Backbone.Router.extend({
		routes: {
	      'home':'home',
	      '*notFound': 'notFound'
	    }, 
	    initialize: function() {

			this.bind('route:home', mainApp.GATrackPageView);

		},
	    home : function() {
	    	if (homeView == null) {  //First OR After Browser Refresh
	    		homeView = new View();
			} else {  	 //If the View has been created (bbView) never re-create
				homeView.render();
			}
	    },
	    notFound : function(){
	    	if(location.href.indexOf("#") == -1){
	    		if (com.compro.cgrails.WORKFLOW == "offline") {
	    			Backbone.history.navigate("#/discipline");
	    		} else {
	    			Backbone.history.navigate("#/home");
	    		}
	    		return true;
	    	}
	    	if(window.location.hash.indexOf("#access_token")>-1){
	    		Backbone.history.navigate("#/home");
	    		return true;
	    	}
	    	$('#message').html("The requested page does not exist.");
	    	var logger = com.compro.application.hsc.logger;
	    	logger.error("No such route defined.");
	    	logger.error("The requested route "+ location.hash +" does not match with the specified routes.");
	    	$('#headers').html("");
	    	$("#ajax-error-label").text("Oops!");
		    $('#ajax-error-modal .modal-body .content-header').text("Invalid path requested!");
		    $('#no-network').hide();
	    	$('#ajax-error-modal .modal-body .content-body').show();
		    $('#ajax-error-modal').modal();
	    }
	});
	
	var View = Backbone.View.extend({
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#panel_home",
		
		events: {
			"click #login-button"		:	"userlogin",
			"click #linkedin-login"		:	"linkedinLogin",
			"click #facebook-login"		:	"facebookLogin",
			"click #twitter-login"		:	"twitterLogin",
			"click #googleplus-login"	:	"googleplusLogin",			
			"click #logout-button"		:	"userlogout",
			"click #discipline-button"	:	"browseDiscipline",
			"click #user-button"	:	"listUsers"
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
			mainApp.responsiveRules.getHomeImageGrp().riload();
			$(this.myPanelId).html(compiled_template_body);
			var view = this;
			if(mainApp.userinfo.loggedin){
				UserModel.get().fetch({
					success: function(model, response){
						mainApp.userinfo.username = model.get("username");
						mainApp.userinfo.firstname = model.get("firstName");
						mainApp.userinfo.lastname = model.get("lastName");
						mainApp.userinfo.email =  model.get("email");
						mainApp.userinfo.userRole = model.get("userRole");
						mainApp.userinfo.pictureUrl = model.get("pictureUrl");
						if (mainApp.userinfo.pictureUrl == null || mainApp.userinfo.pictureUrl == "") {
							mainApp.userinfo.isPictureUrl = false
						}
						var compiledTemplate = Mustache.render(view.template_body_home, 
									{"loggedin": mainApp.userinfo.loggedin,
									 "username": mainApp.userinfo.username,
									 "firstname": mainApp.userinfo.firstname,
									 "lastname": mainApp.userinfo.lastname, 
									 "email":  mainApp.userinfo.email,									 
									 "isAdmin" : (mainApp.userinfo.userRole == "ROLE_ADMIN"),
									 "isFacebookuser":(mainApp.userinfo.userRole == "ROLE_FACEBOOK"),
									 "isLinkedinuser" : (mainApp.userinfo.userRole == "ROLE_LINKEDIN"),
									 "isTwitteruser" : (mainApp.userinfo.userRole == "ROLE_TWITTER"),
									 "isGoogleplususer" : (mainApp.userinfo.userRole == "ROLE_GOOGLEPLUS"),
									 "isPictureUrl":mainApp.userinfo.isPictureUrl,
									 "pictureUrl" : mainApp.userinfo.pictureUrl});
						$("#loginform").html(compiledTemplate);
						
						/*
						 * 1st parameter - update header for login
						 * 2nd parameter - showHomeLink
						 * 3rd parameter - setBackLink 
						 * 4th parameter - showLogoutIcon
						 */
						if(mainApp.userinfo.userRole == "ROLE_FACEBOOK") {
							$($("#user-info").find("img")).css("border","1px solid #E5E5E5");
						}
						/*
						 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
						 */
						mainApp.transitionAppPanel(view.myPanelId);
						mainApp.setHeaderOptions(true, false, false, false);
					}
				});
			} else {
				var compiledTemplate = Mustache.render(view.template_body_home, {"loggedin": mainApp.userinfo.loggedin});
				$("#loginform").html(compiledTemplate);
				if (typeof FB != 'undefined') {
					$("#facebook-login").show();
				}	
				/*
				 * SLIDE myPanelID into com.compro.application.hsc.currentPanelId
				 */
				mainApp.transitionAppPanel(this.myPanelId);				
			}
			this.setElement("#loginform");
			return this; //Do this at the end to allow for method chaining.		
		},
		userlogin : function() {
			Authenticate.authAjax(); 
			return false;
		},
		linkedinLogin: function() {
			Authenticate.loginWithLinkedin()
			return false;
		},
		facebookLogin: function() {
			Authenticate.loginWithFacebook(); 
			return false;
		},
		twitterLogin: function() {
			Authenticate.loginWithTwitter(); 
			return false;
		},
		googleplusLogin: function() {
			Authenticate.loginWithGoogleplus(); 
			return false;
		},		
		userlogout : function() {
			Authenticate.logout();
			return false;
		},
		browseDiscipline: function() {
			Backbone.history.navigate("#/discipline");
		},
		listUsers: function() {
			window.location.href = "admin";
		}		
	});
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};