<html>
	<head>		
		<meta name="layout" content="mainlayout">
	</head>
	
	<body>
		<div id="bb-container" class="container">
			<div id="panel-container" class="easing">
					<div id="panel_home" data-order="0" class="panel-item"></div>
					<div id="panel_discipline-list" data-order="1" class="panel-item"></div>
					<div id="panel_discipline-home" data-order="2" class="panel-item"></div>
					<div id="panel_product-home" data-order="3" class="panel-item"></div>
					<div id="panel_test-home" data-order="4" class="panel-item"></div>
			</div>
		</div>
		<div class="ui-loader ui-loader-default" id="loadingIcon">
			<span class="ui-icon ui-icon-loading">
				<r:img dir="images" file="ajax-loader.gif"/>
			</span>
		</div>		
		<r:script disposition="defer">
   			Authenticate.initialize();
   			window.applicationCache.addEventListener('updateready', function(e) {
				if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
					// Browser downloaded a new app cache.
					// Swap it in and reload the page to get the new hotness.
					window.applicationCache.swapCache();
					if (confirm('A new version/update of this App is available! Click "OK" to reload and update your application from the server.')) {
						window.location.reload();
					}
				} 
			});			
		</r:script>			
	</body>
</html>