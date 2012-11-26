{{#.}}
<div id="page-header" class="container main-body">
	<div class="row">
		<div class="span12">
			<small>{{product.discipline.name}}</small>
			<h1>{{product.name}}</h1>
        </div>
	</div>
</div> 	
<div id="test-home" class="container main-body">
    <div class="row">
    	<div class="span12">
        	<div id="flashcard" class="flashcard">
        		<div class="header">
					<div class="btn-toolbar">
						<div class="btn-group">
							<button class="btn resize"><i class="icon-resize-full"></i></button>
							<button class="btn"><i class="icon-share-alt"></i></button>
						</div>
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
							    <button class="btn btn-large"><i class="icon-ok-circle"></i> {{option1}}</button>
							 {{/option1}}
							 {{#option2}}
							    <button class="btn btn-large"><i class="icon-ok-circle"></i> {{option2}}</button>
							 {{/option2}}
							 {{#option3}}
							    <button class="btn btn-large"><i class="icon-ok-circle"></i> {{option3}}</button>
							 {{/option3}}							 
							 {{#option4}}
							    <button class="btn btn-large"><i class="icon-ok-circle"></i> {{option4}}</button>
							 {{/option4}}							 
							 {{#option5}}
							    <button class="btn btn-large"><i class="icon-ok-circle"></i> {{option5}}</button>
							 {{/option5}}							 
							 {{#option6}}
							    <button class="btn btn-large"><i class="icon-ok-circle"></i> {{option6}}</button>
							 {{/option6}}
							 {{#option7}}
							    <button class="btn btn-large"><i class="icon-ok-circle"></i> {{option7}}</button>
							 {{/option7}}
						</div>
					</div>
					{{/questions}}
				</div>									        		
				<div class="footer">(1/5)</div>	
        	</div>
        </div>	
  </div>     	      
</div>	
{{/.}}
