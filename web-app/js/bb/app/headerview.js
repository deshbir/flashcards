HeaderView = new function() {

	/* ----- Global View Variables ----------------------*/
	var headerbbView = null;
	/* -------------------------------------------------*/
	var mainApp = com.compro.application.hsc;
	var clsMainHeader = mainApp.clsMainHeader;
	
	this.initialize = function(){
		if (headerbbView == null)
			headerbbView = new View();
	};
	
	this.setHeaderMenu = function()	{
		headerbbView.updateloginheader();
	};
	
	this.setHomeIcon = function(show) {
		headerbbView.setHomeIcon(show);
	};
	
	this.setBackIcon = function(show) {
		headerbbView.setBackIcon(show); 
	}
	
	
	var View = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		
		/*------------------------------------------------------*/		
			
		template_header: "",
		
		events: {
			"click #back"	:	"backbutton",
			"click #home"	:	"homebutton",
			"click #logout"	:	"logout"
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
					that.render();
			});
			this.setElement(clsMainHeader);
		},
		
		render : function() {
			
			var compiled_template_header = Mustache.render(this.template_header);
			$(clsMainHeader).html(compiled_template_header);
			
			
			this.updateloginheader();
			this.setHomeIcon(false);
			this.setBackIcon(false);
			return this; //Do this at the end to allow for method chaining.
		},
		
		backbutton : function() {
			//window.history.back();
            if (window.history.length > 0) {
                window.history.back();
                if (window.location.hash == "#/home")
                	this.setBackIcon(false);
                return false;
            }
            navigator.app.exitApp();
		},
		
		homebutton : function() {
			Backbone.history.navigate("#/home");
			this.setBackIcon(false);
		},
		
		logout : function() {
			Authenticate.logout();
		},
		
		updateloginheader : function() {
			if (mainApp.userinfo.loggedin) {
				$(".navbar-inner .loggedin").css("display", "block");
			} else {
				$(".navbar-inner .loggedin").css("display", "none");
			}
			if (window.location.hash == "#/home") {
				TemplateManager.get('authenticate/home', function(template){
					
					var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin});
					$("#loginform").html(templateHTML);				
			 	 });
			}			
		},
		
		setHomeIcon : function(show) {
			if (show) {
				$(".navbar-inner #home").css("display", "block");
			} else {
				$(".navbar-inner #home").css("display", "none");
			}
		},
		
		setBackIcon : function(show) {
			if (show) {
				$(".navbar-inner #back").css("display", "block");
			} else {
				$(".navbar-inner #back").css("display", "none");
			}
		}		
	});
		
};