//Backbone Model(linked to collection)
AdminUserModel = new function() {        
	var Model = Backbone.Model.extend({
			defaults: {
				username : ""
			},
		    validate: function( attributes ){
		    	var errors = [];			
		    	var username = attributes.username;
		    	var password = attributes.password;
		    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;		    	
		    	
	            if (username == "") {
	            	errors.push("Username can't be blank")
	            	$('#error-name').removeClass('hide');
	            	$('#error-username').addClass('hide');
	            } else if (!re.test(username)) {
	            	errors.push("Username must be a valid email id")
	            	$('#error-name').addClass('hide');
	            	$('#error-username').removeClass('hide');
	            } else {
	            	$('#error-name').addClass('hide');
	            	$('#error-username').addClass('hide');
	            };
	            if (password == "") {
	            	errors.push("Password can't be blank")
	            	$('#error-password').removeClass('hide');
	            }else {
	            	$('#error-password').addClass('hide');
	            };            
	            if(errors.length == 0) {
	            	return null;
	            } else {
	            	return errors;
	            }
	        },       
			initialize: function(){
				// If we specify error callback in set or save, this event will not be fired.
	            this.bind("error", function(model, error){
	               if (_.isArray(error)) {
//	               	    alert(error.join("\n"));
	               } else {
	               		alert("Something unexpected happened and your request could not be completed. Please try again later");
	               }
	            });
			}			
	});

  	this.get = function(){  // Each backbone model needs to define "get()" function
		return Model;
	};
};