<g:set var="contextPath" value="${request.contextPath}"/>
{{#.}}	
<div id="product-home" class="main-body">
	<div class="container-fluid">
		<div id="product-info" class="row-fluid">
		    	<div class="span2" id="product-img">
		    		<a href="#">
			        	<img alt="{{name}}" src="${contextPath}/{{image}}"/>
			        </a>
		    	</div>
	        	<div class="span8" id="product-desc">
		        	<h2>{{{name}}}</h2>
		        	<h3>{{author}}</h3>
		        	<p>{{description}}</p>
				</div>
		</div>
	</div>
	<div class="row">
		<div class="span10">
		   	{{#tests}}
			    <button id="{{id}}" class="btn btn-large btn-block flashcardAssess">Flashcards</button>
			{{/tests}}
		</div>
	</div>
	<div class="row" id="playlist">
		    <div class="span10">
        	<h2><i class="icon-list"></i> Playlist</h2>	
        	<ul class="unstyled playlist">
        		{{#topics}}
	            <li>
	            	<a href="{{audioTrack}}">
	            		<i class="icon-play"></i> 
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
</div>	
{{/.}}

