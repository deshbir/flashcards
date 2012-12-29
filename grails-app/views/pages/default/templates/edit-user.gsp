<div id="edit-user">
	<div class="container">
		<div class="row" id="header">
			<div class="span9">
				<ul class="breadcrumb breadcrumb-admin">
  					<li><h2><a href="#/users/list">Manage Accounts</a> <span class="divider">/</span></h2></li>
  					<li class="active"><h2>Edit User</h2></li>
				</ul>
        	</div>
			<div class="span3">
				<button id="adminEditUser" class="accountAction btn" ><i class="icon-save"></i>  Save</button>
			</div>
		</div>
		<div class="row">
			<div class="span12">
				<div class="well well-admin">
					<div class="row">
						<div class="span11">
							<div class="pull-right roles">
								<span class="label label-important">User</span>
								{{#isAdmin}}
									<span class="label label-success">Admin</span>
								{{/isAdmin}}
								{{#isFacebookUser}}
									<span class="label label-info">Facebook User</span>
								{{/isFacebookUser}}		
							</div>				
						</div>
					</div>
					<form id="editUser" class="form-horizontal" action="#" method="post" name="updateUser">
						<div class="control-group">
							<label class="control-label" for="id">#</label>
							<div class="controls">
								<input id="id"  type="text" name="id" value="{{id}}" disabled/>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="username">Username</label>
							<div class="controls">
								<input id="username"  type="text" name="username" value="{{username}}" disabled/>
							</div>
						</div>												
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
		</div>
	</div>
</div>