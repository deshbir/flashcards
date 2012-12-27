<html>
	<head>		
		<meta name="layout" content="adminlayout">
	</head>
	
	<body>
		<div id="bb-container" class="container">

		</div>   		
	</body>
	<sec:ifLoggedIn>	
		<r:script disposition="defer">
			var mainApp = com.compro.application.hsc;
			mainApp.userinfo.loggedin = true;					
   			<sec:access expression="hasRole('ROLE_ADMIN')">
					mainApp.userinfo.admin = true;
   			</sec:access>
		</r:script>
	</sec:ifLoggedIn>  	
</html>