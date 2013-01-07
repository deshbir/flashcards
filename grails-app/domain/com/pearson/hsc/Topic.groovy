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
		return  [];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/

}
