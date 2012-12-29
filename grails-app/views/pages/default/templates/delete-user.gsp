<div id="delete-user">
	<div class="container">
		<div class="row" id="header">
			<div class="span9">
				<ul class="breadcrumb breadcrumb-admin">
 					<li><h2><a href="#/users/list">Manage Accounts</a> <span class="divider">/</span></h2></li>
 					<li class="active"><h2>Delete User</h2></li>
				</ul>
        	</div>
			<div class="span3">
				<button id="adminDeleteUser" class="btn accountAction" ><i class="icon-remove"></i>  Delete</button>
				<button id="adminCancelDelete" class="btn accountAction" ><i class="icon-undo"></i>  Cancel</button>
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
				<h4>Are you sure you want to delete this user?</h4><br/>
				<form class="form-horizontal" id="deleteUser" action="#" method="post" name="removeUser">
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
							<input id="firstName"  type="text" name="firstName" value="{{firstName}}" disabled/>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="lastName">Last Name</label>
						<div class="controls">
							<input id="lastName"  type="text" name="lastName" value="{{lastName}}" disabled/>
						</div>
					</div>
				</form>	
				</div>
			</div>
		</div>		
	</div>
</div>