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
		totalUsers:0,
		/*------------------------------------------------------*/
		
		events:{
			"click #addNewUser": "createOnEnter",
			"click #nxtPage" : "nextPage",
			"click #prevPage" : "previousPage",
			"click .editUser" : "editUser",
			"click .deleteUser" : "deleteUser"
			
		},
		
		initialize: function() {
			
			/* -------------- Setup and Initialize INSTANCE Variables -----------------*/
			this.template_header="";
			this.template_body="";
			this.template_body_row="";
			/* ------------------------------------------------------------------------*/
			this.loadCollection();
			$.ajax({
				url:com.compro.cgrails.REQUEST_CONTEXT + "/api/admin/user/total",
				async:false,
				context:this,
				success:function(data){
					this.totalUsers = parseInt(data);
				}
			});
			
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
			// Enable pagination.
			var that = this;
            Backbone.Pagination.enable(this.collection, {
            	ipp: 10,
                fetchOptions: {
                    add: false,  //replacing the collection's model items with new items
                    cache: !mainApp.isIE,
                    success: function() {
                    	//if there are no more records
                    	if(that.collection.length==0){
                    		that.collection.currentPage -=1;
                    		return;
                    	}
                    	$(that.myPanelRowId).empty();
        				that.collection.each( function(user) {
        					
        					// Enabling and Disabling edit and delete calls.
        					var attribs = user.attributes;
        					
    						if (attribs.pictureUrl == null || attribs.pictureUrl == "") {
    							attribs.isPictureUrl = false
    						} else {
    							attribs.isPictureUrl = true
    						}
    						
        					if(attribs.userRole == "ROLE_ADMIN") {
        						attribs.isAdmin = true;
        					} else if (attribs.userRole == "ROLE_FACEBOOK") {
        						attribs.isFacebookUser = true;
        						attribs.isSocialUser = true;
        					} else if (attribs.userRole == "ROLE_LINKEDIN") {
        						attribs.isLinkedinUser = true;
        						attribs.isSocialUser = true;
        					} else if (attribs.userRole == "ROLE_TWITTER") {
        						attribs.isTwitterUser = true;
        						attribs.isSocialUser = true;
        					} else if (attribs.userRole == "ROLE_GOOGLEPLUS") {
        						attribs.isGoogleplusUser = true;
        						attribs.isSocialUser = true;
        					}     					
        					
        					if(attribs.username == "admin@compro.com" 
        						|| attribs.userRole == "ROLE_FACEBOOK"
        						|| attribs.userRole == "ROLE_LINKEDIN"
        						|| attribs.userRole == "ROLE_TWITTER"
        						|| attribs.userRole == "ROLE_GOOGLEPLUS") {
        						attribs.disableDelete = true;
        						attribs.disableEdit = true;
        					} else {
        						attribs.disableDelete = false;
        						attribs.disableEdit = false;
        					}
        					
        					/* ----- Appending Rows  ----------- */
        			    	var compiled_template_body_row = Mustache.render(that.template_body_row, user.toJSON());	    	
        			    	$(that.myPanelRowId).append(compiled_template_body_row);
        			    });
        				that.validateNextButton();
        	    	}
                }
            });
		},
		
		createOnEnter: function()	{
			Backbone.history.navigate("#/users/addUser", {trigger:true});
		},
		
		nextPage: function(){
			//update total users from server if some user is added or deleted
			if(mainApp.usersUpdated){
				$.ajax({
					url:this.collection.url + "/total",
					async:false,
					context:this,
					success:function(data){
						this.totalUsers = parseInt(data);
						mainApp.usersUpdated = false;
					}
				});
			}
			
			var currPage = this.collection.currentPage;
			var paginationConfig = this.collection.paginationConfig;
			if(currPage * paginationConfig.ipp < this.totalUsers){
				if ((currPage+1) * paginationConfig.ipp >= this.totalUsers){
					$("#nxtPage").parent().addClass('disabled');
				}
				this.collection.nextPage();
				$("#prevPage").parent().removeClass('disabled');
				
			}
			else {
				return;
			}
		},
		
		previousPage : function(){
			var currPage = this.collection.currentPage;
			var paginationConfig = this.collection.paginationConfig;
			if(currPage>2){
				this.collection.previousPage();
				$("#nxtPage").parent().removeClass('disabled');
			}
			else if (currPage == 2){
				this.collection.previousPage();
				$("#prevPage").parent().addClass('disabled');
				$("#nxtPage").parent().removeClass('disabled');
			}
			else {
				return;
			}
		},
		editUser: function(ev) {
			var id = $(ev.currentTarget).data('id');
			window.location.href = "#/users/edit/" + id;
		},
		deleteUser: function(ev) {
			var id = $(ev.currentTarget).data('id');
			window.location.href = "#/users/delete/" + id;
		},
		validateNextButton : function(){
			//update total users from server if some user is added or deleted
			if(mainApp.usersUpdated){
				$.ajax({
					url:this.collection.url + "/total",
					async:false,
					context:this,
					success:function(data){
						this.totalUsers = parseInt(data);
						mainApp.usersUpdated = false;
					}
				});
			}
			var currPage = this.collection.currentPage;
			var paginationConfig = this.collection.paginationConfig;
			if(currPage * paginationConfig.ipp >= this.totalUsers){
				$("#nxtPage").parent().addClass('disabled');
			}
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
	    	this.collection.loadPage();	    	
			
			this.setElement(this.myPanelId);

			return this; //Do this at the end to allow for method chaining.			
		}
	});
	
	
	this.routerInitialize = function(){
		router = new Router();   
	};
};
