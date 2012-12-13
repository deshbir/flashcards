modules = {
    application {
		//'cgrailsLibs' includes JQuery, Backbone, JSON2 & Underscore
		dependsOn 'cgrailsLibs'

		//logging component
		resource url:'js/libs/JSLog.js'
		
		//Bootstrap JS components
		resource url:'js/libs/bootstrap-button.js'
		resource url:'js/libs/bootstrap-collapse.js'
		resource url:'js/libs/bootstrap-dropdown.js'
		resource url:'js/libs/bootstrap-transition.js'
		resource url:'js/libs/bootstrap-modal.js'
		resource url:'js/libs/bootstrap-tab.js'
			
		//Jquery UI for effects
		resource url:'js/libs/jquery.imagesloaded.js'
		
		//View Templates
		resource url:'js/libs/mustache.js'
		
		//Sound Manager
		resource url:'js/sm/soundmanager2.js'
		resource url:'js/sm/page-player.js'
		
		//Swipe (Flash Card touch swiping)
		resource url:'js/libs/swipe.js'
		
		//Main Application JavaScript - init and event binding
		resource url:'js/index.js'
		
		//Backbone app View
		resource url:'js/bb/app/homeview.js'
		//Backbone header View
		resource url:'js/bb/app/headerview.js'
		
		//Backbone discipline View & Models & Collections
		resource url:'js/bb/discipline/disciplinemodel.js'
		resource url:'js/bb/discipline/disciplinecollection.js'
		resource url:'js/bb/discipline/disciplineview.js'
		
		resource url:'js/bb/product/productmodel.js'
		resource url:'js/bb/product/productcollection.js'
		resource url:'js/bb/product/productview.js'
		
		resource url:'js/bb/test/testmodel.js'
		resource url:'js/bb/test/testcollection.js'
		resource url:'js/bb/test/testview.js'
		
		resource url:'js/bb/user/usermodel.js'
		
		//Facebook authentication
		resource url:'js/authenticate/authenticate.js'
    }
}