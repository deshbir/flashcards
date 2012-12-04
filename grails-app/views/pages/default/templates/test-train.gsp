{{#.}}
<div id="page-header" class="main-body">
	<div class="row">
		<div class="span12">
			<small>{{product.discipline.name}}</small>
			<h1>{{product.name}}</h1>
			<p>Question 1 of 5</small></p>
        </div>
	</div>
</div> 	
<div id="test-train" class="main-body">
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
						<div class="btn-group">
							<button class="btn bothQuestionAnswer">Both Sides</button>
						</div>
						<div class="btn-group">
							<button class="btn onlyQuestion">Only Question</button>
						</div>
						<div class="btn-group">
							<button class="btn onlyAnswer">Only Answer</button>
						</div>						
					</div>
        		</div>
        		<div id="body-set">
        			{{#questions}}
	        			<div class="body" style='display:none'>
		        		<h2 class="question"><i class="icon-question-sign"></i> {{text}}</h2>
		        		<h3 class="answer">{{answer1}}</h3>
		        		<p class="explainanswer">{{answerDetails}}</p>
					</div>
					{{/questions}}
				</div>									        		
        	</div>
        </div>	
  </div>     	      
</div>	
{{/.}}
