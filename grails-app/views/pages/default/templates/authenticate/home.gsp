<div class="row">
	<div class="span12">
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
						<input type="text" id="username" name="j_username" class="input-xlarge" placeholder="Email">
						<br/>
						<input type="password" name="j_password" class="input-xlarge" placeholder="Password">
					</fieldset> 
					<button class="btn btn-large" onclick='Authenticate.authAjax(); return false;'>
						login
					</button>                      
				</form>
				<div class="facebook-login">
					<button class="btn btn-large" onclick='Authenticate.loginWithFacebook(); return false;'>
						Login with Facebook
					</button> 
				</div>
				<div id="loginErrorMessage"></div> 	
			</sec:ifNotLoggedIn>				
		</div>		
	</div>
</div>		