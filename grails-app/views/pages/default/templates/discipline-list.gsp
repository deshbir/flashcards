<div id="page_header" class="container main-body">
	<div class="row">
		<div class="span12">
			<h1>Criminal Justice</h1>
   			<hr/>
        </div>
	</div>
</div> 	
<div id="discipline_list" class="container main-body">
	<div class="row">
		{{#.}}
	 	<div class="span4 media">
			<a href="#/discipline/{{id}}"> 
	          <img alt="{{name}}" class="pull-left" src="{{image}}">
	          <div class="media-body">
				<h2>{{name}}</h2>
				<p>{{description}}</p>
	          </div>
	        </a>  	
		</div>
		{{/.}}
	</div>
</div>	


