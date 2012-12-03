<g:set var="contextPath" value="${request.contextPath}"/>
<div class="row">
	{{#.}}
 	<div id="{{id}}" class="span4 media clickbox">
		<a href="javascript:;"> 
          <!-- r:img alt="{{name}}" class="pull-left" uri="{{thumbnail}}"/ -->
          <img alt="{{name}}" class="pull-left hidden-phone" src="${contextPath}/{{thumbnail}}"/>
          <div class="media-body">
			<h2>{{name}}  <i class="icon-chevron-right visible-phone"></i></h2>
			<h3>({{author}})</h3>
			<p class="hidden-phone">{{description}}</p>
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
	{{/.}}
</div>