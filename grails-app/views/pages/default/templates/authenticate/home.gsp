<%@ page import="org.codehaus.groovy.grails.plugins.springsecurity.SpringSecurityUtils" %>
<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<%@ page import="com.compro.cgrails.CgrailsConstants" %>

<g:set var="facebookAppId" value="${SpringSecurityUtils.securityConfig.facebook.appId}" />
<g:set var="workflow" value="${CgrailsUtils.getWorkflow()}"/>

<div id="home">
	{{#loggedin}}
	    <div id="loggedin-container">
	    	<h3> Welcome back</h3>
	    	<div class="hero-unit">
				<div id="user-info">
						<div class="profile-image">
							{{#facebookuser}}
								<img src="https://graph.facebook.com/{{username}}/picture" alt="profile-image" class=""/>
							{{/facebookuser}}
							{{^facebookuser}}
								<a><i class="icon-user-hsc"></i></a>
							{{/facebookuser}}	
						</div>	
						<div>
							<p><strong>{{firstname}} {{lastname}}</strong></p>
							<p><small>{{email}}</small></p>
						</div>				
						
				</div>	
				<button id="discipline-button" class="btn btn-large btn-block">Browse Disciplines</button>
				<g:if test="${workflow != CgrailsConstants.WORKFLOW_OFFLINE}">
					{{#isAdmin}}
						<a id="user-button" href="admin/" class="btn btn-large btn-block">Manage Accounts</a>	
					{{/isAdmin}}											
					<button id="logout-button" class="btn btn-large btn-block">Logout</button>
				</g:if>	
			</div>
	    </div>
	{{/loggedin}}
	{{^loggedin}}			
		<script>
			Authenticate.setFacebookAppId(${facebookAppId})
		</script>	
		<form action="${request.contextPath}/j_spring_security_check" method='POST' id='ajaxLoginForm' name='ajaxLoginForm'>
			<h3>Log In</h3>
			<div id="loginErrorMessage"></div> 	
			<div class="hero-unit">
				 <div class="input-prepend">
					<span class="add-on"><i class="icon-user-hsc"></i></span>
					<input class="span2 input-xlarge" id="username" name="j_username" type="email" placeholder="email" required>
				</div>
				<div class="input-prepend">
					<span class="add-on"><i class="icon-lock"></i></span>
					<input class="span2 input-xlarge" id="j_password" name="j_password" type="Password" placeholder="password" required>
				</div>
				<button class="btn btn-large btn-block" id="login-button">
					Login
				</button> 
			</div>
		</form>
		<button id="facebook-login" class="btn btn-large btn-block" onclick="Authenticate.loginWithFacebook()">
			<span class="facebook-icon"><i class="icon-facebook"></i></span>
			<span class="facebook-text">Connect with Facebook</span>
		</button>
		<div id="loginErrorMessage"></div> 
	{{/loggedin}}				
</div>		
			