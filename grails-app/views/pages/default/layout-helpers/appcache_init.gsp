<script type="text/javascript">
	//Adds a listener for cache update(if any).
	//If a update is found, it swaps the new cache and reloads the window.
	if (window.applicationCache) {
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
	}	 
</script>	 