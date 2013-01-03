<div id="manageAccounts">
	<div class="container">
		<div class="row" id="header">
			<div class="span8">
				<ul class="breadcrumb breadcrumb-admin">
  					<li class="active"><h2>Manage Accounts</h2></li>
				</ul>
        	</div>
			<div class="span4">
				<button id="addNewUser" class="btn accountAction"><i class="icon-plus"></i>  Add New User</button>
			</div>
		</div>
		<div class="row">
			<div class="span12">
				<div class="well well-admin">
					<ul class="pager">
					  <li class="previous disabled">
					    <a id="prevPage" href="javascript:void(0)">&larr; Previous</a>
					  </li>
					  <li class="next">
					    <a id="nxtPage" href="javascript:void(0)">Next &rarr;</a>
					  </li>
					</ul>
					<table class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th>#</th>
								<th>Name (Username)</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody id="user-list">
						</tbody>
					</table>
				</div>			
			</div>
		</div>		
	</div>
</div>
