<g:set var="contextPath" value="${request.contextPath}"/>
<div class="row">
	{{#.}}
 	<div id="{{id}}" class="span4 media clickbox">
		<a href="javascript:;"> 
          <!-- r:img alt="{{name}}" class="pull-left" uri="{{thumbnail}}"/ -->
          <img alt="{{name}}" class="pull-left hidden-phone" src="${contextPath}/{{thumbnail}}"/>
          <div class="media-body">
			<span class="heading">{{{name}}} <i class="icon-chevron-right visible-phone"></i></span>
			<h3>{{author}}</h3>
			<p class="hidden-phone">{{description}}</p>
          </div>
        </a>  	
	</div>
	{{/.}}
</div>