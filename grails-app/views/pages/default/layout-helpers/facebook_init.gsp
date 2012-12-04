<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<%@ page import="com.compro.cgrails.CgrailsConstants" %>

<g:set var="workflow" value="${CgrailsUtils.getWorkflow()}"/>

<g:if test="${workflow != CgrailsConstants.WORKFLOW_OFFLINE}">
	<facebookAuth:init>
		FB.Event.subscribe('auth.login', function(response) {
		  	TemplateManager.get('authenticate/home', function(template){
					UserModel.get().fetch({
						success: function(model, response){
							var compiledTemplate = Mustache.render(template,{"loggedin": mainApp.userinfo.loggedin, "username": model.get("username"),"email":model.get("email") });
							$("#loginform").html(compiledTemplate);
							
							/*
							 * 1st parameter - update header for login
							 * 2nd parameter - showHomeLink
							 * 3rd parameter - setBackLink 
							 */
							//mainApp.setHeaderOptions(true, false, false);
						}
					});						
			 });
		});
	</facebookAuth:init>
</g:if>	
