<g:set var="contextPath" value="${request.contextPath}"/>
{{#.}}	
<div id="product-home" class="main-body">
		<div class="pull-left" id="product-info">
			<a class="pull-left" href="#">
	        	<img alt="{{name}}" src="${contextPath}/{{image}}"/>
	        </a>
	        <div class="pull-left">
	        	<h2>{{name}}</h2>
	        	<h3>{{author}}</h3>
	        	<p>{{description}}</p>
			</div>
	</div>
   	
	<div class="row">
		    <div class="span10">
        	<h2><i class="icon-list"></i> Playlist</h2>
        	<ul class="unstyled playlist">
        		{{#topics}}
	            <li>
	            	<a href="{{audioTrack}}">
	            		<i class=" icon-volume-up"></i> 
	            		<span>{{audioSequence}}</span>
	            		{{name}}
	            	</a>
	            </li>
	            {{/topics}}
	        </ul>
	        <div id="sm2-container">
			<!-- SM2 flash goes here -->
			</div>
	   	</div>	
	</div>		
	{{#tests}}
	      <button id="{{id}}" class="btn btn-large btn-block flashcardAssess">Flashcards</button>
	{{/tests}}	      
</div>	
{{/.}}

