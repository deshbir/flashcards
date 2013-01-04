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
		    	
	            if (username == "") {
	            	errors.push("Username can't be blank")
	            	$('#error-name').removeClass('hide');
	            } else {
	            	$('#error-name').addClass('hide');
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