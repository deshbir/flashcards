package com.pearson.hsc

import grails.converters.JSON

class ProductController {

	/*
	GET	show
	PUT	update
	POST	save
	DELETE	delete
	*/
	def show = {
		if(params.id && params.pid) {
			Discipline discipline = Discipline.get(params.id)
			Product product = Product.findByDisciplineAndId(discipline , params.pid) 
			
			if(product) {
				render product as JSON
				return
			} else {
				def errorMsg = "<h2>No product found with the discipline id :<b>${params.id}</b> and product id :<b>${params.pid}</b></h2>"
				render(status: 404, text: errorMsg)
				return
			}
		}
		else {			
			render(status: 404, text: '<h2>Product not found.</h2>')
			return
		}
	}
}


