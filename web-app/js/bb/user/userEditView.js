UserEditView = new function() {
	
	/* ----- Global View Variables ----------------------*/
	var editView = null;
	/* -------------------------------------------------*/		
	
	var mainApp = com.compro.application.hsc;

	var EditView = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#bb-container",
		/*------------------------------------------------------*/		
			
		template_body: "",
		
		events:{
			"click #adminEditUser": "createOnEnter"
		},
		
		initialize: function(){

			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_body="";
			this.current_user_id=-1;
			this.requested_user_id=-1;
			/* ------------------------------------------------------------------------*/
			
			this.loadCollection(this.options.userId);
			
			//Fill Templates
			var that = this;
			TemplateManager.get('edit-user', 
				function(template){
					that.template_body = template;					
					//Always call render from initialize - as Backbone does not automatically call it.
					that.render(that.options.userId);
				}
			);	    	
		},
		
		loadCollection: function(user_id)	{
			this.requested_user_id=user_id;
			
			if(this.current_user_id!=this.requested_user_id)	{
				this.collection = AdminUserCollection.get(this.requested_user_id);
			}	
		},	
		
		render : function(userId) {
			
			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */
			mainApp.setHeaderOptions(true, false, true);
			
			that = this;
	    	this.collection.fetch({data: {"id": userId}, success: function() {
	    		that.collection.each(function(user){
	    			var attribs = user.attributes;					
					if(attribs.userRole == "ROLE_ADMIN") {
						attribs.isAdmin = true;
					} else if (attribs.userRole == "ROLE_FACEBOOK") {
						attribs.isFacebookUser = true;
					} else if (attribs.userRole == "ROLE_LINKEDIN") {
						attribs.isLinkedinUser = true;
					} else if (attribs.userRole == "ROLE_TWITTER") {
						attribs.isTwitterUser = true;
					} else if (attribs.userRole == "ROLE_GOOGLEPLUS") {
						attribs.isGoogleplusUser = true;
					}        			
	    			$(that.myPanelId).html(Mustache.render(that.template_body, user.toJSON()));
		    	});    		
	    	}});	    	
	    	

			this.setElement(this.myPanelId);
			
			this.current_user_id=this.requested_user_id;
			
			return this; //Do this at the end to allow for method chaining.			    	
		},
		createOnEnter: function(){
			var userid = this.requested_user_id;
			var model = AdminUserCollection.get().get(userid);
			if($("#edit-user .decoration").length > 0) {
				model.set(this.newAttributes(), {silent: true});
				model.save();
		    	Backbone.history.navigate("#/users/list", {trigger:true,replace:true});
			} else {
		    	model.save(
		    			this.newAttributes(), {
		    				success: function() {
			    				Backbone.history.navigate("#/users/list", {trigger:true,replace:true});
			    			}	    			
		    			}
			    );	
			}
	    },
	    
	    newAttributes: function() {
	    	var obj = {
	    			firstName	: 	$("#edit-user #firstName").val(),
	    			lastName	: 	$("#edit-user #lastName").val(),
	    	};
	    	if($("#edit-user .decoration").length > 0) {
	   	    	if($("#edit-user #password").val() != "") {
		    		obj.password = $("#edit-user #password").val();
		    	}
	    	} else {
	    		obj.password = $("#edit-user #password").val();	
	    	}
   	    	return obj;
		 }	    
	});
	
	this.initialize = function(userId) {
		
		if (editView == null) { //First OR After Browser Refresh
			
			editView = new EditView({userId: userId});
			
		} else {  	 //If the View has been created never re-create
			
			editView.loadCollection(userId);
			editView.render(userId);
			
		}
	};
};
