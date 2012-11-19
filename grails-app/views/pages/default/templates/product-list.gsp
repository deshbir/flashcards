{{#.}}
<div id="page_header" class="container main-body">
	<div class="row">
		<div class="span12">
			<h1>{{name}}</h1>
   			<hr/>
        </div>
	</div>
</div> 	
<div id="discipline_list" class="container main-body">
	<div class="row">
		{{#products}}
	 	<div class="span4 media">
			<a href="#/discipline/1/product/{{id}}"> 
	          <img alt="{{name}}" class="pull-left" src="{{image}}">
	          <div class="media-body">
				<h2>{{name}}</h2>
				<p>{{description}}</p>
				<div class="rating">
					<span>☆</span>
					<span>☆</span>
					<span>☆</span>
					<span>☆</span>
					<span>☆</span>
				</div>
	          </div>
	        </a>  	
		</div>
		{{/products}}
	</div>
</div>	
{{/.}}

