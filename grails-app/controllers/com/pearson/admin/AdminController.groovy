package com.pearson.admin

class AdminController {
	
	def index() {
		render (view:"adminpage",model:[:])
	}
	
}
