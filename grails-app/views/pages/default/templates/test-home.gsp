{{#.}}
<div id="page-header" class="main-body">
	<div class="row">
		<div class="span12">
			<small>{{product.discipline.name}}</small>
			<h1>{{product.name}}</h1>
			<p>Question <span id="current-question-no-home">1</span> of 5</small></p>
        </div>
	</div>
</div> 	
<div id="test-home" class="main-body">
    <div class="row">
    	<div class="span12">
        	<div id="flashcard" class="flashcard">
        		<div class="header">
					<div class="btn-toolbar">
						<div class="btn-group">
							<button class="btn previous">Previous</button>
						</div>
						<div class="btn-group">
							<button class="btn next">Next</button>
						</div>				
					</div>
        		</div>
        		<div id="body-set">
        			{{#questions}}
	        		<div class="body" style='display:none'>
		        		<h2 class="question"><i class="icon-question-sign"></i> {{text}}</h2>
		        		<div class="btn-group btn-group-vertical options" data-toggle="buttons-radio">
							 {{#option1}}
							    <button class="btn btn-large radio-control"><span class="radio radio-off"></span><span class="text">{{option1}}</span></button>
							 {{/option1}}
							 {{#option2}}
							    <button class="btn btn-large radio-control"><span class="radio radio-off"></span><span class="text">{{option2}}</span></button>
							 {{/option2}}
							 {{#option3}}
							    <button class="btn btn-large radio-control"><span class="radio radio-off"></span><span class="text">{{option3}}</span></button>
							 {{/option3}}							 
							 {{#option4}}
							    <button class="btn btn-large radio-control"><span class="radio radio-off"></span><span class="text">{{option4}}</span></button>
							 {{/option4}}							 
							 {{#option5}}
							    <button class="btn btn-large radio-control"><span class="radio radio-off"></span><span class="text">{{option5}}</span></button>
							 {{/option5}}							 
							 {{#option6}}
							    <button class="btn btn-large radio-control"><span class="radio radio-off"></span><span class="text">{{option6}}</span></button>
							 {{/option6}}
							 {{#option7}}
							    <button class="btn btn-large radio-control"><span class="radio radio-off"></span><span class="text">{{option7}}</span></button>
							 {{/option7}}
						</div>
						<div class="answer-explanation hide">
							<p class="header-correct">Correct!!!</p>
							<p class="header-wrong">Incorrect!!!</p>
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
