package com.pearson.hsc

import grails.converters.JSON

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
				render discipline as JSON
				return
			} else {
				def errorMsg = "<h2>No discipline found with the id :<b>${params.id}</b></h2>"
				render(status: 404, text: errorMsg)
				return
			}
		}
		else {			
			def allDiscipline = Discipline.list()
			render allDiscipline as JSON
		}
	}
}
