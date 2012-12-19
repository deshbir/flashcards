package com.pearson.hsc

import grails.converters.JSON

class TestController {

	/*
	GET	show
	PUT	update
	POST	save
	DELETE	delete
	*/
	def show = {

		if(params.id && params.pid) {
			Product product = Product.get(params.id)
			Test test = Test.findByProductAndId(product , params.pid) 
			
			if(product) {
				render test as JSON
				return
			} else {
				def errorMsg = "<h2>No test found with the product id :<b>${params.id} </b>and test id :<b>${params.pid} </b></h2>"
				render(status: 404, text: errorMsg)
				return
			}
		}
		else {			
			render(status: 404, text: '<h2>Test not found</h2>')
			return
		}
	}
}


