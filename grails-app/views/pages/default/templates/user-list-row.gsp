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
		<a href="#/users/edit/{{id}}">
			<i class="icon-pencil"></i>
		</a>
		<span id="divider">
		|  
		</span>
		<a href="#/users/delete/{{id}}">
			<i class="icon-remove"></i>
		</a>	
	</td>		
</tr>