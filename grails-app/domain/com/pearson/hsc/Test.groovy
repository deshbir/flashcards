package com.pearson.hsc

class Test {

	SortedSet questions
	static hasMany = [questions: Question]
	
	String name
	String instructions
	
	static belongsTo = [product: Product]
	
	static mapping = {
		questions lazy: false
	}
	
	static constraints = {
	}
	
	
	/***********************************
	 * START Offline configurations
	 ***********************************/
	
	def static String[] offlineCachedUrls() {
		def returnList = []
			def products = Product.list()
			products.each{product->
				def tests = Test.findAllByProduct(product)
				tests.each{test->
					returnList.add("/api/product/" + product.id + "/test/" + test.id)
				}
		}
		return  returnList;
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/

}
