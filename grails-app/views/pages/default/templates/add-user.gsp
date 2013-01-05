<div id="create-user">
	<div class="container">
		<div class="row" id="header">
			<div class="span8">
				<ul class="breadcrumb breadcrumb-admin">
					<li><h2><a href="#/users/list">Manage Accounts</a> <span class="divider">/</span></h2></li>
					<li class="active"><h2>New user</h2></li>
				</ul>
        	</div>
			<div class="span4">
				<button id="adminAddUser" class="btn accountAction" ><i class="icon-save"></i>  Save</button>
			</div>        	
		</div>
		<div class="row">
			<div class="span12">
				<div class="well well-admin">
					<form id="createUser" class="form-horizontal" action="#" method="post" name="addUser">
						<div class="control-group">
							<div class="row">
								<div class="span6">
									<label class="control-label" for="username">Username</label>
									<div class="controls">
										<input id="username" type="text" placeholder="username" name="username" required/>					
									</div>
								</div>
								<div class="span5">
									<div class="alert alert-error hide" id="error-username">
										<button type="button" class="close" data-dismiss="alert">&times;</button>
										<span id="errorMessage"></span>
									</div>									
									<div class="alert alert-error hide" id="error-name">
										<button type="button" class="close" data-dismiss="alert">&times;</button>
										<strong>Warning!</strong> Username can't be blank.
									</div>								
								</div>
							</div>
						</div>
						<div class="control-group">
							<div class="row">
								<div class="span6">
									<label class="control-label" for="password">Password</label>
									<div class="controls">
										<input id="password"  type="password" placeholder="password" name="password" required/>				
									</div>								
								</div>
								<div class="span5">
									<div class="alert alert-error hide" id="error-password">
										<button type="button" class="close" data-dismiss="alert">&times;</button>
										<strong>Warning!</strong> Password can't be blank.
									</div>																		
								</div>									
							</div>						
						</div>
						<div class="control-group">
							<div class="row">
								<div class="span12">
									<label class="control-label" for="confirmPassword">Confirm Password</label>
									<div class="controls">
										<input id="confirmPassword" placeholder="confirm password" type="password" name="confirmPassword" required/>
									</div>								
								</div>
							</div>
						</div>
						<div class="control-group">		
							<div class="row">
								<div class="span12">
									<label class="control-label" for="firstName">First Name</label>
									<div class="controls">
										<input id="firstName" placeholder="first name" type="text" name="firstName" />
									</div>								
								</div>
							</div>											
						</div>
						<div class="control-group">
							<div class="row">
								<div class="span12">
									<label class="control-label" for="lastName">Last Name</label>
									<div class="controls">
										<input id="lastName" placeholder="last name" type="text" name="lastName" />
									</div>								
								</div>
							</div>						
						</div>
						<div class="control-group">
							<div class="row">
								<div class="span12">
									<label class="control-label" for="lastName">User Role</label>
									<div class="controls">
										<select id="userRole" name="userRole">
										  <option value="ROLE_USER">User</option>
										  <option value="ROLE_ADMIN">Admin</option>
										</select>							
									</div>								
								</div>
							</div>
						</div>																
					</form>	
				</div>	
			</div>
		</div>		
	</div>
</div>