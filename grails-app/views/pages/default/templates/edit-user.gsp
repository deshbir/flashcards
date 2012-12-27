<div id="edit-user">
	<div class="container">
		<div class="row">
			<div class="span9">
				<ul class="breadcrumb">
  					<li><h2><a href="#/users/list">Manage Accounts</a> <span class="divider">/</span></h2></li>
  					<li class="active"><h2>Edit User</h2></li>
				</ul>			
			</div>
			<div class="span3">
				<span class="pull-right">
					<button id="adminEditUser" class="btn" ><i class="icon-save"></i>  Save</button>
				</span>
			</div>	
		</div>
	</div>
	<div class="well">
		<form id = "editUser" class="form-horizontal" action="#" method="post" name="updateUser">
			<div class="control-group">
				<label class="control-label" for="firstName">First Name</label>
				<div class="controls">
					<input id="firstName"  type="text" name="firstName" value="{{firstName}}"/>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="lastName">Last Name</label>
				<div class="controls">
					<input id="lastName"  type="text" name="lastName" value="{{lastName}}"/>
				</div>
			</div>
			<div class="control-group">			
				<label class="control-label" for="password">Password</label>
				<div class="controls">
					<input id="password"  type="password" name="password" />
					<span class="alert alert-error hide" id="error-password">
						<strong>Warning!</strong> Password can't be blank.
					</span>						
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="confirmPassword">Confirm Password</label>
				<div class="controls">
					<input id="confirmPassword"  type="password" name="confirmPassword" />
				</div>
			</div>														
		</form>	
	</div>
</div>