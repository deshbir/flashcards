<html>
	<head>		
		<meta name="layout" content="mainlayout">
	</head>
	
	<body>
			<div id="bb-container" class="container">
				<div id="panel_home" data-order="0"></div>
				<div id="panel_discipline-list" data-order="1" style="display:none"></div>
				<div id="panel_discipline-home" data-order="2" style="display:none"></div>
				<div id="panel_product-list" data-order="3" style="display:none"></div>
				<div id="panel_product-home" data-order="4" style="display:none"></div>
				<div id="panel_test-home" data-order="5" style="display:none"></div>
			</div>
		<r:script disposition="defer">	
			Authenticate.initialize();
   		</r:script>
		<sec:ifLoggedIn>	
			<r:script disposition="defer">
				var mainApp = com.compro.application.hsc;
				mainApp.userinfo.loggedin = true;					
				mainApp.userinfo.name = "John Doe";
				mainApp.userinfo.email = "(john@pearson.com)";
			</r:script>
		</sec:ifLoggedIn>   		
	</body>
</html>