<div class="row">
	{{#.}}
 	<div id="{{attributes.id}}" class="span4 clickbox">
		<a href="javascript:;"> 
			 <span class="pull-left"><r:img alt="{{attributes.name}}" uri="/images/icon_placeholder.png"/></span>
			 <span class="heading">{{attributes.name}}</span> 
			 <p class="hidden-phone">{{attributes.description}}</p>
			<span><i class="icon-chevron-right navigate-icon visible-phone"></i></span>
        </a>  	
	</div>
	{{/.}}
</div>