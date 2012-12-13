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
	
	this.setHeaderMenu = function(show)	{
		headerbbView.updateloginheader(show);
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
			"click #logout"	:	"logout",
			"click #admin-panel" :	"showModal",
			"click #music" :	"pauseMusic"
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
			Backbone.history.navigate("#/discipline");
			this.setBackIcon(false);
			return false;
		},
		
		logout : function() {
			Backbone.history.navigate("#/home");
			this.updateloginheader(false);
			return false;
		},
		showModal : function(){
			$('#ajax-error-modal').modal('show');
		},
		pauseMusic : function(){
			mainApp.config.soundManagerObject.pause();
			$("#music").css('display','none');
		},
		updateloginheader : function(show) {
			/******* hiding navbar when no elements to show *******
			var doesElement = $("a.btn-navbar").find("span.icon-bar:visible").length;
			if (doesElement <= 0) {
				$("a.btn-navbar").hide();
			}
			***************/
			if (show == undefined) {
				if (mainApp.userinfo.loggedin) {
					$(".navbar-inner .loggedin").css("display", "block");
				} else {
					$(".navbar-inner .loggedin").css("display", "none");
				}
			} else {
				if (show) {
					$(".navbar-inner .loggedin").css("display", "block");
				} else {
					$(".navbar-inner .loggedin").css("display", "none");
				}				
			}
			if(mainApp.config.musicPlaying){
				$("#music").css("display", "block");
			} else{
				$("#music").css("display", "none");
			}
			if(mainApp.userinfo.admin){
				$("#admin-panel").css("display", "block");
			} else{
				$("#admin-panel").css("display", "none");
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