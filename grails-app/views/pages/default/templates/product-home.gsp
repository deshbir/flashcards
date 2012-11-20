{{#.}}
<div id="page-header" class="container main-body">
	<div class="row">
		<div class="span9">
			<small>Criminal Justice</small>
			<h1>{{name}}</h1>
        </div>
        <div class="span3">
        	<a class="btn play-all-audio"><i class="icon-play"></i> Play All audio</a>
        </div>	
	</div>
</div> 	
<div id="product-home" class="container main-body">
	<div class="row">
		<div class="span6 media">
	        <img class="pull-left" src="{{image}}">
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
			  <p><a class="btn btn-large" href="#/product/{{id}}/test/1">Flash cards<small> (Train)</small></a></p>
		      <p> <a class="btn btn-large href="#/product/{{id}}/test/2">Flash cards<small> (Assess)</small></a></p> 
	   	</div>
	</div>			      
</div>	
{{/.}}

