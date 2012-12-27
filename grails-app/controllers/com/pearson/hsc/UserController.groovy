package com.pearson.hsc

import grails.converters.JSON

class UserController {

	def springSecurityService

	def show = {		
		def user = springSecurityService.currentUser
		if(user){
			render user as JSON
		}
		else{
			render([error: true] as JSON)
		}
		return		
	}
}