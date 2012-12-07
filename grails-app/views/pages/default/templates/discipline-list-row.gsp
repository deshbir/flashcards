<div class="row">
	{{#.}}
 	<div class="span4">
		<a href="#/discipline/{{attributes.id}}"> 
			 <span class="pull-left"><r:img alt="{{attributes.name}}" uri="/images/icon_placeholder.png"/></span>
			 <span class="heading">{{attributes.name}}</span> 
			 <p class="hidden-phone">{{attributes.description}}</p>
			<span><i class="icon-chevron-right navigate-icon visible-phone"></i></span>
        </a>  	
	</div>
	{{/.}}
</div>
