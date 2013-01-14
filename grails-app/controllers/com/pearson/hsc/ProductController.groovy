package com.pearson.hsc

import groovy.json.JsonBuilder

import com.compro.cgrails.CgrailsConstants
import com.compro.cgrails.CgrailsUtils

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
					image : (CgrailsUtils.getWorkflow().equals(CgrailsConstants.WORKFLOW_OFFLINE)) ? product.image.replaceAll(" ", "-") : product.image,
					thumbnail : (CgrailsUtils.getWorkflow().equals(CgrailsConstants.WORKFLOW_OFFLINE)) ? product.thumbnail.replaceAll(" ", "-") : product.thumbnail,
					tests: product.tests.collect {[id: it.id]},
					topics: product.topics.collect {[
						name: it.name, 
						sequence: it.sequence, 
						audioTrack: (CgrailsUtils.getWorkflow().equals(CgrailsConstants.WORKFLOW_OFFLINE)) ? it.audioTrack.replaceAll(" ", "-") :it.audioTrack]},
				]
				def json = new JsonBuilder(data)
				render json.toString()
				
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


