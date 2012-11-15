class UrlMappings {
	static excludes = ["/images/*", "/css/*", "/js/*"]	
	static mappings = {

		"/$skin/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}                
			
		"/"(view:"/index")
		
	}
}