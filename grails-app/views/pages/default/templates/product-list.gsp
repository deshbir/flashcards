<g:set var="contextPath" value="${request.contextPath}"/>
{{#.}}
<div id="page-header" class="main-body">
	<div class="row">
		<div class="span12">
			<h1>{{name}}</h1>
        </div>
	</div>
</div> 	
<div id="product-list" class="main-body">
	<div class="row">
		{{#products}}
	 	<div id="{{id}}" class="span4 media disciplinebox">
			<a href="javascript:;"> 
	          <!-- r:img alt="{{name}}" class="pull-left" uri="{{thumbnail}}"/ -->
	          <img alt="{{name}}" class="pull-left" src="${contextPath}/{{thumbnail}}"/>
	          <div class="media-body">
				<h2>{{name}} <small>({{author}})</small></h2>
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

