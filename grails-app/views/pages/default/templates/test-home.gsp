<g:set var="imagePath" value="${grailsApplication.config.hsc.media.assets.basepath}"/>
{{#.}}
<div id="page-header" class="main-body">
	<div class="container">
		<div class="row">
		  <div class="span12" id="product">
		  {{#book}}
	        	<img alt="{{product.name}}" class="pull-left" src="${imagePath}{{thumbnail}}"/>
	        	<h2>{{name}}</h2>
	        	<h3>{{author}}</h3>
		  {{/book}}
		  {{#lab}}
	        	<img alt="{{product.name}}" class="logo pull-right" src="${imagePath}{{thumbnail}}"/>
	        	<h2>{{name}}</h2>
	        	<p class="hidden-phone">{{description}}</p>
		  {{/lab}}		
			</div>
		</div>
	</div>
</div> 	
<div id="test-home" class="main-body">
    <div class="row">
    	<div class="span2"></div>
    	<div class="span8">
        	<div id="flashcard" class="flashcard">
        		<div class="header">
        			<div class="row-fluid">
        				<div class="span3">
        					<h4>Question <span id="current-question-no-home">1</span> of 5</small></h4>
        				</div>
        				<div class="span9">
							<div class="btn-toolbar">
								<div class="btn-group">
									<button class="btn btn-large previous">Previous</button>
								</div>
								<div class="btn-group">
									<button class="btn btn-large next">Next</button>
								</div>				
							</div>
        				</div>
        			</div>
        		</div>
        		<div id="body-set">
        		 {{#tests}}
        			{{#questions}}
	        		<div class="body">
		        		<h2 class="question"><i class="icon-question-sign"></i><span>{{text}}</span></h2>
		        		<div class="btn-group btn-group-vertical options" data-toggle="buttons-radio">
							 {{#options}}
							    <button class="btn radio-control"><i class="radio-options icon-quiz-circle"></i><span>{{.}}</span></button>
							 {{/options}} 
						</div>
						<%--<div class="answer-explanation hide">
							<p class="explainanswer"></p>
						</div>
					--%></div>
					{{/questions}}
				{{/tests}}
				</div>									        		
        	</div>
        </div>	
        <div class="span2"></div>
  </div>     	      
</div>	
{{/.}}
