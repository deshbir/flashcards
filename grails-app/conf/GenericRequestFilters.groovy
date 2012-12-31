class GenericRequestFilters {

   def filters = {

      logFilter(controller: '*', action: '*') {
		  
         before = {
			 String requestURIDetails = request.forwardURI;
			 // For detailed lagging of "cgrailTemplate".
			 if(requestURIDetails.contains("cgrailstemplate")) {
				 requestURIDetails = requestURIDetails + "?path=" + params.path + "&skin=" + params.skin;
			 }
			 request.setAttribute("com.newrelic.agent.TRANSACTION_NAME", requestURIDetails);
			 return true
         }
      }
   }
}