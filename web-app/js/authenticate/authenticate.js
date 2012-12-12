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
		TemplateManager.get('authenticate/home', function(template){
			
			var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin, "username": "I dont know", "email": "I dont know. Help me."});
			$("#loginform").html(templateHTML);				
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
				mainApp.userinfo.facebookuser =  false;
				Backbone.history.navigate("#/home",{trigger:true});
				if (window.location.hash == "#/home") {
					TemplateManager.get('authenticate/home', function(template){
						var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin});
						$("#loginform").html(templateHTML);				
				 	 });
				}	
				
				/*
				 * 1st parameter - update header for login
				 * 2nd parameter - showHomeLink
				 * 3rd parameter - setBackLink 
				 */
				mainApp.setHeaderOptions(true, false, false);
			}
		});
		if(mainApp.config.soundManagerObject!=null)
			mainApp.config.soundManagerObject.stop();
	}
	function isStandaloneWebApp () {
		if(("standalone" in window.navigator) && window.navigator.standalone){
			return true;
		}
		return false;
	}
	
	function formFacebookRedirectURI () {
  		var URI = window.location.protocol + "//" + window.location.host + com.compro.cgrails.REQUEST_CONTEXT + "/"
  		return URI;
  	}
};