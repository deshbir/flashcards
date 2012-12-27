AdminUserView = new function() {

	/* ----- Global View Variables ----------------------*/
	var listbbuserView = null;
	/* -------------------------------------------------*/

	var mainApp = com.compro.application.hsc;
	
	var Router = Backbone.Router.extend({
		routes: {
			"users/list": "userlist",
			"users/addUser": "addUser",
			"users/edit/:userId": "editUser",
			"users/delete/:id": "deleteUser"
	    },	    

	    userlist : function() {
			if (listbbuserView == null) {  //First OR After Browser Refresh
				
				listbbuserView = new View();
				
			} else {  	 //If the View has been created (bbView) never re-create
				
				listbbuserView.render();
			}
	    },
	    
	    addUser: function(){
	    	UserAddView.initialize();
	    },

	    editUser: function(userId){
	    	UserEditView.initialize(userId);
	    },

	    deleteUser: function(userId){
	    	UserDeleteView.initialize(userId);
	    }
	});


	var View = Backbone.View.extend({
		
		/*--------------- Static Class Variable ------------*/
		myPanelId:"#bb-container",
		myPanelRowId:"#bb-container #user-list",
		/*------------------------------------------------------*/
		
		events:{
			"click #addNewUser": "createOnEnter"
		},
		
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			this.template_body="";
			this.template_body_row="";
			/* ------------------------------------------------------------------------*/
			
			this.loadCollection();
			
			//Fill Templates
			var that = this;					
			TemplateManager.get('user-list',
					function(template){
						that.template_body = template;
						
						TemplateManager.get('user-list-row',
								function(template){
									that.template_body_row = template;
									//Always call render from initialize - as Backbone does not automatically call it.									
									that.render();
								}
						);
					}
			);
		},
		
		loadCollection: function()	{
			this.collection = AdminUserCollection.get();	
		},
		
		createOnEnter: function()	{
			Backbone.history.navigate("#/users/addUser", {trigger:true});
		},
		
		render : function() {
			
			/*
			 * 1st parameter - update header for login
			 * 2nd parameter - showHomeLink
			 * 3rd parameter - setBackLink 
			 */

			mainApp.setHeaderOptions(true, false, true);

			var compiled_template_body = Mustache.render(this.template_body);
			$(this.myPanelId).html(compiled_template_body);
			
			/* ----- Appending Rows  ----------- */
			that = this;
	    	this.collection.fetch({success: function() {
				that.collection.each( function(user) {
					var attribs = user.attributes;
					if(attribs.isAdmin == true || attribs.isFacebookUser == true) {
						attribs.disableDelete = true;
					} else {
						attribs.disableDelete = false;
					}
					if(attribs.username == "admin@compro.com") {
						attribs.disableEdit = true;
					} else {
						attribs.disableEdit = false;
					}					
					/* ----- Appending Rows  ----------- */
			    	var compiled_template_body_row = Mustache.render(that.template_body_row, user.toJSON());	    	
			    	$(that.myPanelRowId).append(compiled_template_body_row);
			    });
	    	}});	    	
			
			this.setElement(this.myPanelId);

			return this; //Do this at the end to allow for method chaining.			
		}
	});
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};
