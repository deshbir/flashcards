package com.pearson.hsc

import grails.converters.JSON
import groovy.json.JsonBuilder

class DisciplineController {

	/*
	GET	show
	PUT	update
	POST	save
	DELETE	delete
	*/
	def show = {
		if(params.id) {
			
			Discipline discipline = Discipline.get(params.id)
			
			if(discipline) {
				def data = [
					id : discipline.id,
					name : discipline.name,
					products: discipline.products.collect {[
						id: it.id, 
						type : it.type, 
						author : it.author, 
						description : it.description, 
						image: it.image, 
						thumbnail: it.thumbnail, 
						name : it.name, 
						sequence : it.sequence ]}
				]
				def json = new JsonBuilder(data)
				
				render json.toString()
				
				return
			} else {
				def errorMsg = "<h2>No discipline found with the id :<b>${params.id}</b></h2>"
				render(status: 404, text: errorMsg)
				return
			}
		}
		else {
			
			def allDiscipline = Discipline.list()			
			def data = [
				disciplines: allDiscipline.collect {[id: it.id, name : it.name, sequence : it.sequence]}
			]

			def json = new JsonBuilder(data.disciplines)
			render json.toString()
		}
	}
}
