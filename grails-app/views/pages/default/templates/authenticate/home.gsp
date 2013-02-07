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
				<div class="media" id="user-info">
				  <div class="pull-left profile-image">
			  			{{#isFacebookuser}}
							<img class="media-object social-image" src="https://graph.facebook.com/{{username}}/picture" alt="profile-image" />
						{{/isFacebookuser}}
						{{^isFacebookuser}}
							{{#isLinkedinuser}}
								{{#isPictureUrl}}							
									<img class="media-object social-image" src="{{pictureUrl}}" alt="profile-image" />
								{{/isPictureUrl}}
								{{^isPictureUrl}}
									<img class="media-object social-image" src="http://s.c.lnkd.licdn.com/scds/common/u/img/icon/icon_no_photo_no_border_offset_100x100.png" alt="profile-image" />
								{{/isPictureUrl}}	
							{{/isLinkedinuser}}
							{{^isLinkedinuser}}
								{{#isTwitteruser}}							
									<img class="media-object social-image" src="{{pictureUrl}}" alt="profile-image" />
								{{/isTwitteruser}}
								{{^isTwitteruser}}
									{{#isGoogleplususer}}	
										{{#isPictureUrl}}							
											<img class="media-object social-image" src="{{pictureUrl}}" alt="profile-image" />
										{{/isPictureUrl}}
										{{^isPictureUrl}}
											<img class="media-object social-image" src="https://lh4.googleusercontent.com/-wlDFRng0dJE/AAAAAAAAAAI/AAAAAAAAA44/7-AIbvz8xU4/photo.jpg?sz=50" alt="profile-image" />
										{{/isPictureUrl}}
									{{/isGoogleplususer}}
									{{^isGoogleplususer}}
										<a class="media-object"><i class="icon-user-hsc"></i></a>
									{{/isGoogleplususer}}
								{{/isTwitteruser}}
							{{/isLinkedinuser}}			
						{{/isFacebookuser}}
				  </div>
				  <div class="media-body">
				    <p class="strong">{{firstname}} {{lastname}}</p>
				    <p class="small break-word">{{email}}</p>
				  </div>
				</div>
				<button id="discipline-button" class="btn btn-large btn-block">Browse Disciplines</button>
				<g:if test="${workflow != CgrailsConstants.WORKFLOW_OFFLINE}">
					{{#isAdmin}}
						<button id="user-button" class="btn btn-large btn-block">Manage Accounts</button>	
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
					<input class="span2 input-xlarge" id="username" name="j_username" type="text" autocapitalize="off" placeholder="username" required>
				</div>
				<div class="input-prepend">
					<span class="add-on"><i class="icon-lock"></i></span>
					<input class="span2 input-xlarge" id="j_password" name="j_password" type="Password" placeholder="password" required>
				</div>
				<button class="btn btn-large btn-block" id="login-button">
					Login
				</button> 
				<div class="icons">
					<div class="circle" id="twitter-login"><i class="icon-twitter"></i></div>
					<div class="circle" id="googleplus-login"><i class="icon-google-plus"></i></div>
					<div class="circle" id="facebook-login"><i class="icon-facebook"></i></div>
					<div class="circle" id="linkedin-login"><i class="icon-linkedin"></i></div>
				</div>
			</div>
		</form>
		
		<div id="loginErrorMessage"></div> 
	{{/loggedin}}				
</div>		
			