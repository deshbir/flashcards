package com.pearson.hsc

import java.util.SortedSet;

class Discipline {
	
	SortedSet products
	static hasMany = [products: Product]
	
	static mapping = {
		products lazy: true
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
