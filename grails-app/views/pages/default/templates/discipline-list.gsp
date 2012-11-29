<div id="page-header" class="main-body">
	<div class="row">
		<div class="span12">
			<h1>Disciplines</h1>
        </div>
	</div>
</div> 	
<div id="discipline-list" class="main-body">
	<div class="row">
		{{#.}}
	 	<div class="span4">
			<a href="#/discipline/{{id}}"> 
				<h2><i class="icon-tag"></i> {{name}}</h2> 
				<p>{{description}}</p>
	        </a>  	
		</div>
		{{/.}}
	</div>
</div>	


