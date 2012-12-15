<div class="row">
	{{#.}}
 	<div id="{{attributes.id}}" class="span4 clickbox">
		<a href="javascript:;"> 
			 <span class="heading">{{attributes.name}}</span> 
			 <span class="navigate-icon"><i class="icon-chevron-right visible-phone"></i></span>
			 <p class="hidden-phone">{{attributes.description}}</p>
        </a>  	
	</div>
	{{/.}}
</div>