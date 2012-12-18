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
				// What is Backbone standard for this?
				render(status: 404, text: '<h2>No test found with the following id.</h2>')
				return
			}
		}
		else {			
			render(status: 404, text: '<h2>Test not found</h2>')
			return
		}
	}
}


