package com.pearson.hsc

import groovy.json.JsonBuilder

import com.compro.cgrails.CgrailsConstants
import com.compro.cgrails.CgrailsUtils

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
					image : (CgrailsUtils.getWorkflow().equals(CgrailsConstants.WORKFLOW_OFFLINE)) ? product.image.replaceAll(" ", "-") :product.image,
					thumbnail : (CgrailsUtils.getWorkflow().equals(CgrailsConstants.WORKFLOW_OFFLINE)) ? product.thumbnail.replaceAll(" ", "-") :product.thumbnail,
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


