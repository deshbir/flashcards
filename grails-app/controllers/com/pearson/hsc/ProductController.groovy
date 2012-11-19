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
			Product product = discipline.getProduct(params.pid); 
			
			if(product) {
				render product as JSON
				return
			} else {
				// What is Backbone standard for this?
				render "Not found."
				return
			}
		}
		else {			
			render "Not found."
			return
		}
	}
}


