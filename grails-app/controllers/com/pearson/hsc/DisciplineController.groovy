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
				// What is Backbone standard for this?
				render "Not found."
				return
			}
		}
		else {			
			def allDiscipline = Discipline.list()
			render allDiscipline as JSON
		}
	}
}
