<tr>
	<td>{{id}}</td>									
	<td>
		{{firstName}} {{lastName}} ({{username}})<br/>
		{{#isAdmin}}
			<span class="label label-important">Admin</span>
		{{/isAdmin}}
		{{#isFacebookUser}}
			<span class="label label-important">Facebook User</span>
		{{/isFacebookUser}}
		<span class="label label-important">User</span>		
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