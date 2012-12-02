<g:set var="contextPath" value="${request.contextPath}"/>
{{#.}}
<div id="page-header" class="main-body">
	<div class="row">
		<div class="span9">
			<small>{{discipline.name}}</small>
			<h1>{{name}}</h1>
        </div>
        <div class="span3">
        	<a class="btn play-all-audio"><i class="icon-play"></i> Play All audio</a>
        </div>	
	</div>
</div> 	
<div id="product-home" class="main-body">
	<div class="row">
		<div class="span6 media">
	        <img alt="{{name}}" class="pull-left" src="${contextPath}/{{image}}"/>
	        <div class="media-body">
	        	<p>{{description}}</p>
				<div class="rating">
					<span>☆</span>
					<span>☆</span>
					<span>☆</span>
					<span>☆</span>
					<span>☆</span>
				</div>
			</div>		        
    	</div>
	    <div class="span6">
        	<h3><i class="icon-list"></i> Topic Playlist</h3>
        	<ul class="unstyled playlist">
        		{{#topics}}
	            <li><a href="{{audioTrack}}">{{name}}</a></li>
	            {{/topics}}
	        <ul>
	        <div id="sm2-container">
			<!-- SM2 flash goes here -->
			</div>
	   	</div>
	</div>
	<div class="row">
		<div class="span6">
			{{#tests}}
			  <button id="{{id}}" class="btn btn-large flashcardAssess">Flash cards<small> (Train)</small></button>
		      <!-- p><a class="btn btn-large href="#/product/3/test/{{id}}">Flash cards<small> (Assess)</small></a></p -->
		      <button id="{{id}}" class="btn btn-large flashcardAssess">Flash cards<small> (Assess)</small></button>
		    {{/tests}} 
	   	</div>
	</div>			      
</div>	
{{/.}}

