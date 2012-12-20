package com.pearson.hsc

import grails.converters.JSON
import groovy.json.JsonBuilder

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
				def data = [
					id : product.id,
					name : product.name,
					type : product.type,
					description : product.description,
					author : product.author,
					image : product.image,
					thumbnail : product.thumbnail,
					tests: product.tests.collect {[id: it.id]},
					topics: product.topics.collect {[
						name: it.name, 
						sequence: it.sequence, 
						audioTrack: it.audioTrack]},
				]
				def json = new JsonBuilder(data)
				render json.toString()
				
				return
			} else {
				def errorMsg = "<p>No product found with the discipline id :<b>${params.id}</b> and product id :<b>${params.pid}</b></p>"
				render(status: 404, text: errorMsg)
				return
			}
		}
		else {			
			render(status: 404, text: '<p>Product not found.</p>')
			return
		}
	}
}


