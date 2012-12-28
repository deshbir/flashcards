UserAddView = new function() {
	
	/* ----- Global View Variables ----------------------*/
	var addView = null;
	/* -------------------------------------------------*/
	
	var mainApp = com.compro.application.hsc;
	
	var AddView = Backbone.View.extend({

		/*--------------- Static Class Variable ------------*/
		myPanelId:"#bb-container",
		/*------------------------------------------------------*/		
		
		template_body: "",
		
		events:{
			"click #adminAddUser": "createOnEnter"
		},
		initialize: function(){

			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_body="";
			/* ------------------------------------------------------------------------*/
			
			this.loadCollection();
			
			//Fill Templates
			var that = this;
			TemplateManager.get('add-user', 
				function(template){
					that.template_body = template;					
					//Always call render from initialize - as Backbone does not automatically call it.
					that.render();
				}
			);	    	
		},
		loadCollection: function()	{
			this.collection = AdminUserCollection.get();
		},	
		render : function(userId) {
			
			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */
			mainApp.setHeaderOptions(true, false, true);
			
			$(this.myPanelId).html(Mustache.render(this.template_body, "{}"));    	

			this.setElement(this.myPanelId);
			
			/*
			 * Assigning input fields to current instance.
			 */
			this.username = this.$("#username");
			this.password = this.$("#password");
			this.firstName = this.$("#firstName");
			this.lastName = this.$("#lastName");		
			
			return this; //Do this at the end to allow for method chaining.			    	
		},		
	    createOnEnter: function(){
	    	AdminUserCollection.get().create(
	    			this.newAttributes(),
	    			{
	    				success: function() {
	    					Backbone.history.navigate("#/users/list", {trigger:true,replace:true});
	    				}
	    			}
	    		);
	    },
	    newAttributes: function() {
		      return {
		    	  username : this.username.val(),
		    	  password	: 	this.password.val(),
		    	  firstName	: 	this.firstName.val(),
		    	  lastName	: 	this.lastName.val(),
		    	  enabled	: 	true,
		    	  email	: 	this.username.val()
		    };
		 }
	});
	
	this.initialize = function() {
		
		if (addView == null) { //First OR After Browser Refresh
			
			addView = new AddView();
			
		} else {  	 //If the View has been created never re-create
			
			addView.loadCollection();
			addView.render();
			
		}
	};
};