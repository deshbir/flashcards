package com.compro.cgrails

class SinglepageController {
	def index() {
		boolean isFacebookLoginSuccess = false;
		if (params.isFacebookLoginSuccess) {
			isFacebookLoginSuccess = true;
		}
		render (view:"singlepage",model:[isFacebookLoginSuccess:isFacebookLoginSuccess])
	}	
}
