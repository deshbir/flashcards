<g:set var="imagePath" value="${grailsApplication.config.hsc.media.assets.basepath}"/>
<div class="row-fluid">
	{{#.}}
 	<div id="{{id}}" class="span4 media clickbox">
		<div class="anchor">
          <!-- r:img alt="{{name}}" class="pull-left" uri="{{thumbnail}}"/ -->
		  {{#book}}
		 	  <i class="icon-chevron-right visible-phone arrow"></i>
		      <img alt="{{name}}" class="responsive book pull-left" data-src="${imagePath}{{thumbnail}}"/>
	          <div class="media-body">
				<span class="heading">{{{name}}}</span>
				<div>
					<h3>{{author}}</h3>
				</div>
				<p class="hidden-phone">{{description}}</p>
			  </div>
		  {{/book}}
		  {{#lab}}
		 		<i class="icon-chevron-right visible-phone arrow"></i>
		        <img alt="{{name}}" class="logo pull-right" src="${imagePath}{{thumbnail}}"/>
		        <div class="media-body"> 
					<p class="heading">{{{name}}}</p>
					<p class="hidden-phone">{{description}}</p>
				</div>	
		  {{/lab}}
		    <div class="discipline-music-container">
	      </div>
        </div>  	
         
	</div>
	{{/.}}
</div>