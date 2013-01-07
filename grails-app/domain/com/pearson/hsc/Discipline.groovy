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
		def returnList = []
		def disciplines = Discipline.list()
		returnList.add("/api/discipline/")
		disciplines.each{discipline->
			returnList.add("/api/discipline/" + discipline.id)
		}
		return  returnList
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/
}
