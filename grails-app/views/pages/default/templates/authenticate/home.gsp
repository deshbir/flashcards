<div id="home">
	{{#loggedin}}
	    <div id="loggedin-container">
	    	<h3> Welcome back</h3>
	    	<div class="hero-unit">
				<div class="row-fluid" id="user-info">
					<div class="span3"><r:img uri="/images/profile_image.png" alt="profile-image"/></div>
					<div class="span6">
						<p>{{username}}</p>
						<p>{{email}}</p>
					</div>
				</div>	
				<a href="#/discipline" class="btn btn-large btn-block">Browse Disciplines</a>
			</div>
	    </div>
	{{/loggedin}}
	{{^loggedin}}
		<form action="${request.contextPath}/j_spring_security_check" method='POST' id='ajaxLoginForm' name='ajaxLoginForm'>
			<h3>Log In</h3>
			<div class="hero-unit">
				<input id="username" name="j_username" class="input-xlarge" placeholder="Email" type="text">
				<br>
				<input name="j_password" class="input-xlarge" placeholder="Password" type="password">
				<button class="btn btn-large btn-block" onclick="Authenticate.authAjax(); return false;">
					Log In
				</button> 
				<p id="forgot-pwd"> Forgot your password? <a href="#">Get Help</a> </p>
			</div>
		</form>
		<button id="facebook-login" class="btn btn-large btn-block" onclick="Authenticate.loginWithFacebook(); return false;">
			<p><i class="icon-facebook"></i></p>
			<span class="facebook-text">Connect with Facebook</span>
		</button>
		<div id="loginErrorMessage"></div> 	
	{{/loggedin}}				
</div>		
			