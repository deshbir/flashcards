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
					mainApp.handleLoginSuccess(false);	
				} else if (response.error) { 
					mainApp.userinfo.loggedin = false;	
					
					$("#loginErrorMessage").show();
					$("#loginErrorMessage").html("<span class='errorMessage'>" + response.error + "</span>");
					$($("#ajaxLoginForm").find("input[type=email]")).addClass("invalid-name");
					$($("#ajaxLoginForm").find("input[type=password]")).addClass("invalid-name");
				} else {
					mainApp.userinfo.loggedin = false;
					
					$("#loginErrorMessage").show();
					$("#loginErrorMessage").html(response); 
					$($("#ajaxLoginForm").find("input[type=email]")).addClass("invalid-name");
					$($("#ajaxLoginForm").find("input[type=password]")).addClass("invalid-name");
				} 
	        }
	    });		    
  	},
  	this.initialize = function(){
  		
  		$.ajax({
			url: com.compro.cgrails.REQUEST_CONTEXT + "/login/ajaxSuccess",
			type: 'GET',    	
			success: function(response) {
				if (response.username != "anonymousUser") {
					UserModel.get().fetch({
						success: function(model, response){				
							mainApp.userinfo.loggedin = true;					
							mainApp.userinfo.name = model.get("username");
							mainApp.userinfo.email = model.get("email");
							mainApp.userinfo.facebookuser = model.get("isFacebookUser");
							mainApp.userinfo.admin = model.get("isAdmin");	
							TemplateManager.get('authenticate/home', function(template){			
								var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin, "username": mainApp.userinfo.name, "email": mainApp.userinfo.email, "firstname": model.get("firstName"),"lastname": model.get("lastName")});
								$("#loginform").html(templateHTML);	
								if (typeof FB != 'undefined') {
									$("button#facebook-login").show();
								}	
						 	 });				
						}
					});
				} else {
					mainApp.userinfo.loggedin = false;	
					TemplateManager.get('authenticate/home', function(template){			
						var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin});
						$("#loginform").html(templateHTML);	
						if (typeof FB != 'undefined') {
							$("button#facebook-login").show();
						}	
				 	 });
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
	   				mainApp.handleLoginSuccess(true);
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
				mainApp.userinfo.loggedin = false;
				mainApp.userinfo.admin = false;
				mainApp.userinfo.facebookuser =  false;
				UserModel.destroy();
				TemplateManager.get('authenticate/home', function(template){
					var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin});
					$("#loginform").html(templateHTML);	
					if (typeof FB != 'undefined') {
						$("button#facebook-login").show();
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
  					+ com.compro.cgrails.SKIN + "/main/facebookLoginSuccess/"  					
  		return URI;
  	}
};