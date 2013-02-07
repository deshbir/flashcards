<div id="edit-user">
	<div class="container">
		<div class="row" id="header">
			<div class="span8">
				<ul class="breadcrumb breadcrumb-admin">
  					<li><h2><a href="#/users/list">Manage Accounts</a> <span class="divider">/</span></h2></li>
  					<li class="active"><h2>Edit User</h2></li>
				</ul>
        	</div>
			<div class="span4">
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
									<span class="label facebookLabel">Facebook User</span>
								{{/isFacebookUser}}
								{{#isLinkedinUser}}
									<span class="label linkedinLabel">Linkedin User</span>
								{{/isLinkedinUser}}	
								{{#isTwitterUser}}
									<span class="label twitterLabel">Twitter User</span>
								{{/isTwitterUser}}	
								{{#isGoogleplusUser}}
									<span class="label googleplusLabel">Google+ User</span>
								{{/isGoogleplusUser}}			
							</div>				
						</div>
					</div>
					<form id="editUser" class="form-horizontal" action="#" method="post" name="updateUser">
						<div class="control-group">
							<div class="row">
								<div class="span12">
									<label class="control-label" for="id">#</label>
									<div class="controls">
										<input id="id"  type="text" name="id" value="{{id}}" disabled/>
									</div>								
								</div>
							</div>
						</div>
						<div class="control-group">
							<div class="row">
								<div class="span12">
									<label class="control-label" for="username">Username</label>
									<div class="controls">
										<input id="username"  type="text" name="username" value="{{username}}" disabled/>
									</div>								
								</div>
							</div>
						</div>												
						<div class="control-group">
							<div class="row">
								<div class="span12">
									<label class="control-label" for="firstName">First Name</label>
									<div class="controls">
										<input id="firstName"  type="text" name="firstName" value="{{firstName}}"/>
									</div>								
								</div>
							</div>						
						</div>
						<div class="control-group">
							<div class="row">
								<div class="span12">
									<label class="control-label" for="lastName">Last Name</label>
									<div class="controls">
										<input id="lastName"  type="text" name="lastName" value="{{lastName}}"/>
									</div>								
								</div>
							</div>
						</div>
						<div class="note">
							<em>Select the entry box (below) to change password:</em>
							<hr/>
						</div>
						<div class="control-group">	
							<div class="row">
								<div class="span6">
									<label class="control-label" for="password">Password</label>
									<div class="controls">
										<input id="password"  type="password" name="password" class="decoration" onclick="javascript: editPassword();"/>					
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
										<input id="confirmPassword"  type="password" class="decoration" name="confirmPassword" />
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