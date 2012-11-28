package com.pearson.hsc

class Product implements Comparable {

	static hasMany = [topics: Topic, tests: Test]
	
	static belongsTo = [discipline: Discipline]
	
	static mapping = {
		topics lazy: false
	}
	
	String name
	String description
	String thumbnail
	String image
	int sequence
	
	
	int compareTo(def val) {
		return sequence <=> val?.sequence
	}
	
	/***********************************
	 * START Offline configurations
	 ***********************************/
	
	def static String[] offlineCachedUrls() {
		return  ["/api/discipline/1", 
				 "/api/discipline/2", 
				 "/api/discipline/3"];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/
}
