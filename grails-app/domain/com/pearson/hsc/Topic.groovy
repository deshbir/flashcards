package com.pearson.hsc

class Topic implements Comparable {

	String name
	String audioTrack
	String sequence
	
	static belongsTo = [product: Product]
	
	static constraints = {
	}
	
	int compareTo(def val) {
		return sequence <=> val?.sequence
	}
	
	/***********************************
	 * START Offline configurations
	 ***********************************/
	
	def static String[] offlineCachedUrls() {
		return  ["/api/discipline/1/product/1",
				 "/api/discipline/1/product/2",
				 "/api/discipline/1/product/3",
				 "/api/discipline/2/product/11",
				 "/api/discipline/2/product/12",
				 "/api/discipline/2/product/13"];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/

}
