<g:set var="imagePath" value="${grailsApplication.config.hsc.media.assets.basepath}"/>
<div class="row-fluid">
	{{#.}}
 	<div id="{{id}}" class="span4 media clickbox">
		<a href="javascript:;">
          <!-- r:img alt="{{name}}" class="pull-left" uri="{{thumbnail}}"/ -->
		  {{#book}}
		      <img alt="{{name}}" class="book pull-left" src="${imagePath}{{thumbnail}}"/>
	          <div class="media-body">
				<span class="heading">{{{name}}}</span>
				<i class="icon-chevron-right visible-phone"></i>
				<h3>{{author}}</h3>
				<p class="hidden-phone">{{description}}</p>
			  </div>
		  {{/book}}
		  {{#lab}}
		        <img alt="{{name}}" class="logo pull-right" src="${imagePath}{{thumbnail}}"/>
		        <div class="media-body"> 
					<p class="heading">{{{name}}}</p>
					<i class="icon-chevron-right visible-phone"></i>
					<p class="hidden-phone">{{description}}</p>
				</div>	
		  {{/lab}}
        </a>  	
	</div>
	{{/.}}
</div>