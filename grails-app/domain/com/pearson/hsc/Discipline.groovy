package com.pearson.hsc

class Discipline {

	static hasMany = [products: Product]
	
	static mapping = {
		products lazy: false
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
		return  ["/api/discipline/"];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/
}
