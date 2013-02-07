<tr>
	<td>{{id}}</td>										
	<td>
		<div class="media">
			{{#isFacebookUser}}
				<img src="https://graph.facebook.com/{{username}}/picture?type=square" alt="" class="userImage pull-left"/>
			{{/isFacebookUser}}
			{{#isLinkedinUser}}
				{{#isPictureUrl}}							
					<img class="userImage pull-left" src="{{pictureUrl}}" alt="" />
				{{/isPictureUrl}}
				{{^isPictureUrl}}
					<img class="userImage pull-left" src="http://s.c.lnkd.licdn.com/scds/common/u/img/icon/icon_no_photo_no_border_offset_100x100.png" alt="" />
				{{/isPictureUrl}}	
			{{/isLinkedinUser}}	
			{{#isTwitterUser}}
				<img class="userImage pull-left" src="{{pictureUrl}}" alt="" />
			{{/isTwitterUser}}	
			{{#isGoogleplusUser}}
				{{#isPictureUrl}}							
					<img class="userImage pull-left" src="{{pictureUrl}}" alt="" />
				{{/isPictureUrl}}
				{{^isPictureUrl}}
					<img class="userImage pull-left" src="https://lh4.googleusercontent.com/-wlDFRng0dJE/AAAAAAAAAAI/AAAAAAAAA44/7-AIbvz8xU4/photo.jpg?sz=25" alt="" />
				{{/isPictureUrl}}	
			{{/isGoogleplusUser}}						
			<div class="media-body wordWrap">
				{{firstName}} {{lastName}}
				<small>
					{{#isSocialUser}}{{^isTwitterUser}}({{email}}){{/isTwitterUser}}{{/isSocialUser}}{{^isSocialUser}}({{username}}){{/isSocialUser}}
				</small>
				<div>
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
	</td>									
	<td>
		{{#disableEdit}}
			<i class="icon-pencil disableControls"></i>
		{{/disableEdit}}
		{{^disableEdit}}
			<a class="editUser" data-id="{{id}}" href="javascript:;" >
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
			<a  class="deleteUser" data-id="{{id}}"  href="javascript:;">
				<i class="icon-remove"></i>
			</a>
		{{/disableDelete}}			
	</td>		
</tr>