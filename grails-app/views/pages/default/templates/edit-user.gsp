<div id="edit-user">
	<div class="header">
		<div class="container">
			<div class="row">
				<div class="span9 headerText">
					<ul class="breadcrumb">
	  					<li><a href="#/users/list">Manage Accounts</a> <span class="divider">/</span></li>
	  					<li class="active">Edit User</li>
					</ul>			
				</div>
				<div class="span3 manageUser" >
					<span class="pull-right" id="adminEditUser">
						<button class="btn" ><i class="icon-save"></i>  Save</button>
					</span>	
				</div>	
			</div>
		</div>
	</div>
	<div class="body well">
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
						<button type="button" class="close" data-dismiss="alert">&times;</button>
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