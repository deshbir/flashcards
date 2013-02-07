Authenticate = new function() {
	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	var mainApp = com.compro.application.hsc;
	var facebookAppId;
	
	this.authAjax = function(){
		$("#loginErrorMessage").hide();
		$($("#ajaxLoginForm").find("input[type=email]")).removeClass("invalid-name");
		$($("#ajaxLoginForm").find("input[type=password]")).removeClass("invalid-name");
		var form = document.ajaxLoginForm; 
		$.ajax({
 			url: form.action,
 			type: 'POST',
	    	data: { 
	    		j_username: form.j_username.value,
	    		j_password:  form.j_password.value
	    	},
	        success: function(response) {
				if (response.success) { 
					mainApp.userinfo.userRole =  response.userRole;
					mainApp.handleLoginSuccess();						
				} else {
					mainApp.userinfo.loggedin = false;						
					$("#loginErrorMessage").show();
					var errorMessage = "";
					if (response.error) {
						errorMessage = response.error;						
					} else {
						errorMessage = response;
					}
					$("#loginErrorMessage").html("<span class='errorMessage'>" + errorMessage + "</span>");
					$($("#ajaxLoginForm").find("input[type=email]")).addClass("invalid-name");
					$($("#ajaxLoginForm").find("input[type=password]")).addClass("invalid-name");
					
				} 
	        }
	    });		    
  	},
  	this.loginWithFacebook = function(){
  		if(isStandaloneWebApp()) {
  			var redirectURI = formFacebookRedirectURI();
  			var authURL = "https://www.facebook.com/dialog/oauth/?client_id=" + this.facebookAppId +
  				"&redirect_uri=" + redirectURI + "&scope=email,user_likes&response_type=token";
  			window.location = authURL;
  		    return;
  		} else {
	  		 FB.login(function(response) {
	   			if (response.authResponse) {
	   				mainApp.userinfo.userRole = "ROLE_FACEBOOK";
	   				mainApp.handleLoginSuccess();
	 		  	} else {
	 		  		mainApp.userinfo.loggedin = false;					
	 				$("#loginErrorMessage").show();
	 				$("#loginErrorMessage").html("<span class='errorMessage'>User cancelled login or did not fully authorize</span>");
	 				$($("#ajaxLoginForm").find("input[type=email]")).addClass("invalid-name");
					$($("#ajaxLoginForm").find("input[type=password]")).addClass("invalid-name");
	 	  		}
	   		},{scope: 'email,user_likes'});  
  		}	 
	},
	
	this.loginWithLinkedin = function(){
		window.location = "login/social/linkedin";
	},
	this.loginWithTwitter = function(){
		window.location = "login/social/twitter";
	},
	this.loginWithGoogleplus = function(){
		window.location = "login/social/googleplus";
	},	
	this.logout = function(){
		FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
			  FB.logout();
		  } 
		});
		ajaxLogout();		  
	},
	
	this.setFacebookAppId = function(appId){
		this.facebookAppId =  appId;
	}	
	
	
	function ajaxLogout() {
		$.ajax({
			url: com.compro.cgrails.REQUEST_CONTEXT + "/j_spring_security_logout",
			type: 'GET',    	
			success: function(response) {
				mainApp.resetUserinfo();
				UserModel.destroy();
				TemplateManager.get('authenticate/home', function(template){
					var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin});
					$("#loginform").html(templateHTML);	
					if (typeof FB != 'undefined') {
						$("#facebook-login").show();
					}					
			 	 });
				
				/*
				 * 1st parameter - update header for login
				 * 2nd parameter - showHomeLink
				 * 3rd parameter - setBackLink 
				 */
				mainApp.setHeaderOptions(true, false, false);
			}
		});
		if(mainApp.soundManagerConfig.soundManagerObject!=null)
			mainApp.soundManagerConfig.soundManagerObject.stop();
	}
	function isStandaloneWebApp () {
		if(("standalone" in window.navigator) && window.navigator.standalone){
			return true;
		}
		return false;
	}
	
	function formFacebookRedirectURI () {
  		var URI = window.location.protocol + "//" + window.location.host 
  					+ com.compro.cgrails.REQUEST_CONTEXT + "/"
  					+ com.compro.cgrails.SKIN + "/login/facebookLoginSuccess/"  					
  		return URI;
  	}
};