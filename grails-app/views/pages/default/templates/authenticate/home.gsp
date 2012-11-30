<div id="home">
	<sec:ifLoggedIn>
	    <div id="loggedin-container">
		<h3> Welcome back!</h3>
		
		<div class="user-info">
			<i class="icon-github-sign"></i>
			<div>
				<h3><sec:username/></h3>

				<h4>{email}</h4>
			</div>
			
		</div>	
		<div class="user-buttons">
			<a href="#/discipline" class="btn">Browse Disciplines</a>
			<br/>
			<a href="#/discipline" class="btn">Test yourself</a>
		</div>
	    </div>
	</sec:ifLoggedIn>
	<sec:ifNotLoggedIn>
		<form action="${request.contextPath}/j_spring_security_check" method='POST' id='ajaxLoginForm' name='ajaxLoginForm'>
			<h3>Log In</h3>
			<p>Enter your username (or email-id) followed by your password.</p>
			<input id="username" name="j_username" class="input-xlarge" placeholder="Email" type="text">
			<br>
			<input name="j_password" class="input-xlarge" placeholder="Password" type="password">
			<button class="btn" onclick="Authenticate.authAjax(); return false;">
				Sign In
			</button>                    
		</form>
		<h2 class="align-or"> or </h2>
		<div class="facebook-login">
			<button class="btn btn-large" onclick="Authenticate.loginWithFacebook(); return false;">
				<span class="span-facebook"><i class="icon-facebook-sign"></i></span>
				<span class="facebook-text">Login using your Facebook</span>
			</button>
	        </div>
		<div id="loginErrorMessage"></div> 	
	</sec:ifNotLoggedIn>				
</div>		
			