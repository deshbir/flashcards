package com.pearson.hsc

class Product {

	static hasMany = [topics: Topic, tests: Test]
	
	static belongsTo = [discipline: Discipline]
	
	static mapping = {
		topics lazy: false
	}
	
	String name
	String description
	String thumbnail
	String image
	
	static constraints = {
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
