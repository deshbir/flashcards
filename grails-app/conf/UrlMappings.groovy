class UrlMappings {
	static excludes = ["/images/*", "/css/*", "/js/*"]	
	static mappings = {

		"/$skin/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}                
			
		"/"(controller:"main")
		"/api/discipline/$id?"(resource:"discipline")
		
	}
}