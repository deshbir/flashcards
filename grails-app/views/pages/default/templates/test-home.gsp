<g:set var="contextPath" value="${request.contextPath}"/>
{{#.}}
<div id="page-header" class="main-body">
	<div class="container-fluid">
		<div id="product-info" class="row-fluid">
        	<div id="product-desc" class="span12" >
	        	<img alt="{{name}}" class="pull-left" src="${contextPath}/{{product.thumbnail}}"/>
	        	<h2>{{product.name}}</h2>
	        	<h3>{{product.author}}</h3>
			</div>
		</div>
	</div>
</div> 	
<div id="test-home" class="main-body">
    <div class="row">
    	<div class="span12">
        	<div id="flashcard" class="flashcard">
        		<div class="header">
        			<div class="row-fluid">
        				<div class="span3">
        					<h4>Question <span id="current-question-no-home">1</span> of 5</small></h4>
        				</div>
        				<div class="span9">
							<div class="btn-toolbar">
								<div class="btn-group">
									<button class="btn previous">Previous</button>
								</div>
								<div class="btn-group">
									<button class="btn next">Next</button>
								</div>				
							</div>
        				</div>
        			</div>
        		</div>
        		<div id="body-set">
        			{{#questions}}
	        		<div class="body">
		        		<h2 class="question"><i class="icon-question-sign"></i> {{text}}</h2>
		        		<div class="btn-group btn-group-vertical options" data-toggle="buttons-radio">
							 {{#options}}
							    <button class="btn btn-large radio-control"><span class="radio radio-off"></span><span class="text">{{.}}</span></button>
							 {{/options}} 
						</div>
						<div class="answer-explanation hide">
							<p class="explainanswer"></p>
						</div>
					</div>
					{{/questions}}
				</div>									        		
        	</div>
        </div>	
  </div>     	      
</div>	
{{/.}}
