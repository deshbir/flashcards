<div id="create-user">
	<div class="container">
		<div class="row">
			<div class="span9 headerText">
				<ul class="breadcrumb">
  					<li><a href="#/users/list">Manage Accounts</a> <span class="divider">/</span></li>
  					<li class="active">New user</li>
				</ul>
			</div>
			<div class="span3">
				<span class="pull-right">
					<button id="adminAddUser" class="btn" ><i class="icon-save"></i>  Save</button>
				</span>
			</div>
		</div>
	</div>
	<div class="well">
		<form id="createUser" class="form-horizontal" action="#" method="post" name="addUser">
			<div class="control-group">
				<label class="control-label" for="username">Username</label>
				<div class="controls">
					<input id="username"  type="text" placeholder="Username" name="username" />
					<span class="alert alert-error hide" id="error-name">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong>Warning!</strong> Username can't be blank.
					</span>
					<span class="alert alert-error hide" id="error-username">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong>Warning!</strong> Username must be a valid email id.
					</span>		
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="password">Password</label>
				<div class="controls">
					<input id="password"  type="password" placeholder="Password" name="password" />
					<span class="alert alert-error hide" id="error-password">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong>Warning!</strong> Password can't be blank.
					</span>						
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="confirmPassword">Confirm Password</label>
				<div class="controls">
					<input id="confirmPassword"  placeholder="Confirm Password" type="password" name="confirmPassword" />
				</div>
			</div>
			<div class="control-group">													
				<label class="control-label" for="firstName">First Name</label>
				<div class="controls">
					<input id="firstName" placeholder="First Name" type="text" name="firstName" />
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="lastName">Last Name</label>
				<div class="controls">
					<input id="lastName" placeholder="Last Name" type="text" name="lastName" />
				</div>
			</div>									
		</form>	
	</div>	
</div>