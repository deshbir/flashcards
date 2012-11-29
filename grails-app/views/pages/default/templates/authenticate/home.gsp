<div id="home">
	<sec:ifLoggedIn>
		<p>
			<h3>Hello <sec:username/></h3>
		</p>	
		<p>
			<a href="#/discipline" class="btn btn-large">Continue.. <small>( <sec:username/>)</small></a>
		</p>
	</sec:ifLoggedIn>
	<sec:ifNotLoggedIn>
		<form action="${request.contextPath}/j_spring_security_check" method='POST' id='ajaxLoginForm' name='ajaxLoginForm'>
			<fieldset>
				<h3>Log In</h3>
				<br/>
				<input id="username" name="j_username" class="input-xlarge" placeholder="Email" type="text">
				<br>
				<input name="j_password" class="input-xlarge" placeholder="Password" type="password">
			</fieldset>
			<button class="btn" onclick="Authenticate.authAjax(); return false;">
				Sign In
			</button>                    
		</form>
		<h2 class="align-or"> or </h2>
		<div class="facebook-login">
			<button class="btn btn-large align-right" onclick="Authenticate.loginWithFacebook(); return false;">
				<i class="icon-facebook"></i>
				Login using your <br/> Facebook
			</button>
	    </div>
		<div id="loginErrorMessage"></div> 	
	</sec:ifNotLoggedIn>				
</div>		
			