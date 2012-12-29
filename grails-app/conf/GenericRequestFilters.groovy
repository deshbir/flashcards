class GenericRequestFilters {

   def filters = {

      logFilter(controller: '*', action: '*') {
		  
         before = {
			 request.setAttribute("com.newrelic.agent.TRANSACTION_NAME", request.forwardURI);
			 return true
         }
      }
   }
}