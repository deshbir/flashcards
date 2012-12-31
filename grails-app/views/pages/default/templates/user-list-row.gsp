<tr>
	<td>{{id}}</td>										
	<td>
		<div class="media">
			{{#isFacebookUser}}
				<img src="https://graph.facebook.com/{{username}}/picture?type=square" alt="" class="userImage pull-left"/>
			{{/isFacebookUser}}					
			<div class="media-body">
				{{firstName}} {{lastName}} 
				<small>
					({{#isFacebookUser}}{{email}}{{/isFacebookUser}}{{^isFacebookUser}}{{username}}{{/isFacebookUser}})
				</small>				
				<div>
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
	</td>									
	<td>
		{{#disableEdit}}
			<i class="icon-pencil disableControls"></i>
		{{/disableEdit}}
		{{^disableEdit}}
			<a href="#/users/edit/{{id}}">
				<i class="icon-pencil"></i>
			</a>
		{{/disableEdit}}		
		<span id="divider">
		|  
		</span>
		{{#disableDelete}}
			<i class="icon-remove disableControls"></i>
		{{/disableDelete}}
		{{^disableDelete}}
			<a href="#/users/delete/{{id}}">
				<i class="icon-remove"></i>
			</a>
		{{/disableDelete}}			
	</td>		
</tr>