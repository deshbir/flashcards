Authenticate = new function() {
	var clsMainHeader = com.compro.application.hsc.clsMainHeader;
	
	this.authAjax = function(){
		$("#loginErrorMessage").hide();
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
					
					var mainApp = com.compro.application.hsc;
					mainApp.userinfo.loggedin = true;		
					
					TemplateManager.get('authenticate/home', function(template){
						UserModel.get().fetch({
							success: function(model, response){
								var compiledTemplate = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin, "username": model.get("username"), "email":  model.get("email")} );
								$("#loginform").html(compiledTemplate);
							}
						});
						TemplateManager.get('header', 
								function(template){
							 		var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin, "home": "active", "disciplines": "", "products": ""});
									$(clsMainHeader).html(templateHTML);
						},{cache:false});						
				 	  });
				} else if (response.error) { 
					
					var mainApp = com.compro.application.hsc;
					mainApp.userinfo.loggedin = false;	
					
					$("#loginErrorMessage").show();
					$("#loginErrorMessage").html("<span class='errorMessage'>" + response.error + "</span>");
				} else {
					
					var mainApp = com.compro.application.hsc;
					mainApp.userinfo.loggedin = false;
					
					$("#loginErrorMessage").show();
					$("#loginErrorMessage").html(response); 
				} 
	        }
	    });		    
  	},
  	this.initialize = function(){
		TemplateManager.get('authenticate/home', function(template){
			
			var mainApp = com.compro.application.hsc;
			var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin, "username": "I dont know", "email": "I dont know. Help me."});
			$("#loginform").html(templateHTML);				
	 	 });
  	},
  	this.loginWithFacebook = function(){
		FB.login(function(response) {
			var mainApp = com.compro.application.hsc;
		   if (response.authResponse) {
			   
				TemplateManager.get('header', 
						function(template){
					 		var templateHTML = Mustache.render(template, {"loggedin": mainApp.userinfo.loggedin, "home": "active", "disciplines": "", "products": ""});
							$(clsMainHeader).html(templateHTML);
				},{cache:false});			   
			   TemplateManager.get('authenticate/home', function(template){
					UserModel.get().fetch({
						success: function(model, response){
							var compiledTemplate = Mustache.render(template,{"loggedin": mainApp.userinfo.loggedin, "username": model.get("username"),"email":model.get("email") });
							$("#loginform").html(compiledTemplate);
						}
					});						
			 	});
		   } else {
			   $("#loginErrorMessage").show();
			   $("#loginErrorMessage").html("<span class='errorMessage'>User cancelled login or did not fully authorize</span>");  
		   }
		 },{scope: 'email,user_likes'});		
	},
	this.logout = function(){
		FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
			  FB.logout();
		  } 
		});
		ajaxLogout();		  
	}
	
	function ajaxLogout() {
		$.ajax({
			url: com.compro.cgrails.REQUEST_CONTEXT + "/j_spring_security_logout",
			type: 'GET',    	
			success: function(response) {
				var mainApp = com.compro.application.hsc;
				mainApp.userinfo.loggedin = false;
				window.location.href = com.compro.cgrails.REQUEST_CONTEXT 
			}
		});		    
	}
};