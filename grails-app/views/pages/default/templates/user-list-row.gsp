<tr>
	<td>{{id}}</td>									
	<td>
		{{firstName}} {{lastName}} ({{username}})<br/>
		<span class="label label-important">User</span>
		{{#isAdmin}}
			<span class="label label-success">Admin</span>
		{{/isAdmin}}
		{{#isFacebookUser}}
			<span class="label label-info">Facebook User</span>
		{{/isFacebookUser}}
	</td>									
	<td>
		{{#disableEdit}}
			<a href="#/users/edit/{{id}}" class="disableControls">
				<i class="icon-pencil"></i>
			</a>
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
			<a href="#/users/delete/{{id}}" class="disableControls">
				<i class="icon-remove"></i>
			</a>
		{{/disableDelete}}
		{{^disableDelete}}
			<a href="#/users/delete/{{id}}">
				<i class="icon-remove"></i>
			</a>
		{{/disableDelete}}			
	</td>		
</tr>