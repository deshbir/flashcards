<div id="delete-user">
	<div class="container">
		<div class="row">
			<div class="span9 headerText">
				<ul class="breadcrumb">
 					<li><a href="#/users/list">Manage Accounts</a> <span class="divider">/</span></li>
 					<li class="active">Delete User</li>
				</ul>			
			</div>
			<div class="span3">
				<span class="pull-right">			
					<button id="adminDeleteUser" class="btn" ><i class="icon-remove"></i>  Delete</button>
					<button id="adminCancelDelete" class="btn" ><i class="icon-undo"></i>  Cancel</button>
				</span>
			</div>
		</div>
	</div>
	<div class="well">
		<h4 id="confirmCheck">Are you sure you want to delete this user?</h4><br/>
		<form class="form-horizontal" id="deleteUser" action="#" method="post" name="removeUser">
			<div class="control-group">
				<label class="control-label" for="username">Username</label>
				<div class="controls content">
					<label id="username">{{username}}</label>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="firstName">First Name</label>
				<div class="controls content">
					<label id="firstName">{{firstName}}</label>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="lastName">Last Name</label>
				<div class="controls content">
					<label id="lastName">{{lastName}}</label>
				</div>
			</div>
		</form>	
	</div>
</div>