package com.pearson.hsc

class Discipline {

	static hasMany = [products: Product]
	
	static mapping = {
		products lazy: false
		sort "sequence"
	}

	String name
	String description
	String thumbnail
	String image
	int sequence
	
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
