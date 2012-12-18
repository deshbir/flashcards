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
				// What is Backbone standard for this?
				render(status: 404, text: '<h2>No product found with the following id.</h2>')
				return
			}
		}
		else {			
			render(status: 404, text: '<h2>Product not found.</h2>')
			return
		}
	}
}


