<!doctype html>
<html>
	<head>		
		<meta name="layout" content="mainlayout">
	</head>
	
	<body>
		<r:script type="text/javascript">
			View1.routerInitialize();
			Backbone.history.start();
			if (window.location.hash.length <= 1){
				Backbone.history.navigate("#/template1", {trigger:true,replace:true});
			} 	
		</r:script>	
	<body/>
</html>