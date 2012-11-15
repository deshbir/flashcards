modules = {
    application {
		//'cgrailsLibs' includes JQuery, Backbone, JSON2 & Underscore
		dependsOn 'cgrailsLibs'

		//Bootstrap JS components
		resource url:'js/libs/bootstrap-button.js'
		resource url:'js/libs/bootstrap-collapse.js'
		resource url:'js/libs/bootstrap-dropdown.js'
		resource url:'js/libs/bootstrap-transition.js'
		resource url:'js/libs/bootstrap-modal.js'
			
		//View Templates
		resource url:'js/libs/mustache.js'
		
		//Main Application JavaScript - init and event binding
		resource url:'js/index.js'
    }
}