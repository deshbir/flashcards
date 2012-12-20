package com.pearson.hsc

import grails.converters.JSON
import groovy.json.JsonBuilder

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
				def data = [
					id : product.id,
					name : product.name,
					type : product.type,
					author : product.author,
					description : product.description,
					image : product.image,
					thumbnail : product.thumbnail,
					tests: product.tests.collect {[
						id: it.id,
							questions: it.questions.collect {[ 
								type: it.type,
								text: it.text,
								sequence: it.sequence,
								option1: it.option1,
								option2: it.option2,
								option3: it.option3,
								option4: it.option4,
								option5: it.option5,
								option6: it.option6,
								option7: it.option7,
								answer1: it.answer1,
								answerDetails: it.answerDetails
							]}
						]}
				]
				def json = new JsonBuilder(data)
				render json.toString()
				
				//render test as JSON
				return
			} else {
				def errorMsg = "<p>No test found with the product id :<b>${params.id} </b>and test id :<b>${params.pid} </b></p>"
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


