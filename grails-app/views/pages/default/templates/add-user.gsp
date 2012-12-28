<div id="create-user">
	<div class="container">
		<div class="row">
			<div class="span9">
				<ul class="breadcrumb breadcrumb-admin">
					<li><h2><a href="#/users/list">Manage Accounts</a> <span class="divider">/</span></h2></li>
					<li class="active"><h2>New user</h2></li>
				</ul>
        	</div>
			<div class="span3">
				<button id="adminAddUser" class="btn accountAction" ><i class="icon-save"></i>  Save</button>
			</div>        	
		</div>
	</div>
	<div class="well well-admin">
		<form id="createUser" class="form-horizontal" action="#" method="post" name="addUser">
			<div class="control-group">
				<label class="control-label" for="username">Username</label>
				<div class="controls">
					<input id="username" type="email" placeholder="email" name="username" required/>					
					<span class="alert alert-error hide" id="error-name">
						<strong>Warning!</strong> Username can't be blank.
					</span>
					<span class="alert alert-error hide" id="error-username">
						<strong>Warning!</strong> Username must be a valid email id.
					</span>		
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="password">Password</label>
				<div class="controls">
					<input id="password"  type="password" placeholder="password" name="password" required/>
					<span class="alert alert-error hide" id="error-password">
						<strong>Warning!</strong> Password can't be blank.
					</span>						
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="confirmPassword">Confirm Password</label>
				<div class="controls">
					<input id="confirmPassword" placeholder="confirm password" type="password" name="confirmPassword" required/>
				</div>
			</div>
			<div class="control-group">													
				<label class="control-label" for="firstName">First Name</label>
				<div class="controls">
					<input id="firstName" placeholder="first name" type="text" name="firstName" />
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="lastName">Last Name</label>
				<div class="controls">
					<input id="lastName" placeholder="last name" type="text" name="lastName" />
				</div>
			</div>									
		</form>	
	</div>	
</div>