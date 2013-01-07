package com.pearson.hsc


class Product implements Comparable {

	SortedSet topics
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
	String type
	String author
	
	int compareTo(def val) {
		return sequence <=> val?.sequence
	}
	
	/***********************************
	 * START Offline configurations
	 ***********************************/
	
	def static String[] offlineCachedUrls() {
		def returnList = []
		def disciplines = Discipline.list()
		disciplines.each{discipline->
			def products = Product.findAllByDiscipline(discipline);
			products.each{product->
				returnList.add("/api/discipline/" + discipline.id + "/product/" + product.id)
			}
			
		}
		return  returnList;
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/
}
