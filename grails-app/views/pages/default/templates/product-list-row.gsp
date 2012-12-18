<g:set var="imagePath" value="${grailsApplication.config.hsc.media.assets.basepath}"/>
<div class="row-fluid">
	{{#.}}
 	<div id="{{id}}" class="span4 media clickbox">
		<a href="javascript:;">
          <!-- r:img alt="{{name}}" class="pull-left" uri="{{thumbnail}}"/ -->
		  {{#book}}
		      <img alt="{{name}}" class="pull-left hidden-phone" src="${imagePath}{{thumbnail}}"/>
	          <div class="media-body">
				<span class="heading">{{{name}}}</span>
				<i class="icon-chevron-right visible-phone"></i>
				<h3>{{author}}</h3>
				<p class="hidden-phone">{{description}}</p>
			  </div>
		  {{/book}}
		  {{#lab}}
		        <img alt="{{name}}" style="height:40px;margin-bottom:20px" class="hidden-phone" src="${imagePath}{{thumbnail}}"/> 
				<p class="heading visible-phone">{{{name}}}</p>
				<i class="icon-chevron-right visible-phone"></i>
				<h3 class="visible-phone">{{author}}</h3>
				<p class="hidden-phone">{{description}}</p>
		  {{/lab}}
        </a>  	
	</div>
	{{/.}}
</div>