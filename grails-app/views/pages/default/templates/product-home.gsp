<g:set var="imagePath" value="${grailsApplication.config.hsc.media.assets.basepath}"/>
{{#.}}	
<div id="product-home" class="main-body">
	<div class="container">
		<div id="product-info" class="row">
		  {{#book}}
	        	<div class="span12" id="product-desc-book">
	        		<img class="pull-left" alt="{{name}}" src="${imagePath}{{thumbnail}}"/>
		        	<h2>{{{name}}}</h2>
		        	<h3>{{author}}</h3>
		        	<p class="hidden-phone">{{description}}</p>
				</div>
		  {{/book}}
		  {{#lab}}
	        	<div class="span12" id="product-desc-lab">
	        		<img class="pull-right" alt="{{name}}" src="${imagePath}{{thumbnail}}"/>
		        	<h2>{{{name}}}</h2>
		        	<p class="hidden-phone">{{description}}</p>
				</div>
		  {{/lab}}
		</div>
	</div>
	<div class="row">
		<div class="span2"></div>
		<div class="span8">
			{{#tests}}
			    <button id="{{id}}" class="btn btn-large pull-right flashcardAssess">Flashcards</button>
			{{/tests}}
	  </div>	
	  <div class="span2"></div>
	</div>
	<div class="row" id="playlist">
		<div class="span2"></div>
		<div class="span8">
        	<h2><i class="icon-list"></i> Playlist</h2>	
        	<ul class="unstyled playlist">
        		{{#topics}}
	            <li>
	            	<a href="${grailsApplication.config.hsc.media.assets.basepath}{{audioTrack}}">
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
	  <div class="span2"></div>
	</div>		
</div>	
{{/.}}

