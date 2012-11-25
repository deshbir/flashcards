<div class="container hero">
    <div class="row">
            <div class="span12">
            <h2>Health Sciences & Careers</h2>
            <h1>HSC</h1>
            <!-- p><a class="btn btn-large" rel="tooltip" data-original-title="Not active in demo" href="#/discipline">Sign In</a></p -->
            <div id="loginform">
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
									<button class="btn btn-large" type="submit">
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
			</div>            
        </div>
    </div>
</div>  <!-- End of Hero Unit -->

<!-- Three column, but responsive, product descriptions -->
<div class="container main-body main-body-splash">
    <div class="row">
	      <div class="span6 media">
	          <img alt="Lorem ipsum" class="pull-left" src="http://placehold.it/80x100">
	          <div class="media-body">
	            <h2>Lorem ipsum</h2>
	          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	          </div>	
	      </div>
	      <div class="span6 media">
	          <img alt="Lorem ipsum" class="pull-left" src="http://placehold.it/80x100">
	          <div class="media-body">
	            <h2>Lorem ipsum</h2>
	          	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	          </div>	
	      </div>
    </div>
    
</div>