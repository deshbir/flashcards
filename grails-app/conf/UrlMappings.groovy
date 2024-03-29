class UrlMappings {
	static excludes = ["/images/*", "/css/*", "/js/*"]	
	static mappings = {

		"/login/$action?/$id?"(controller:"login")
		"/logout/$action?/$id?"(controller:"logout")
		
		"/$skin/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}                
			
		"/"(controller:"main")
		"/api/discipline/$id?"(resource:"discipline")
		"/api/discipline/$id/product/$pid?"(resource:"product")
		"/api/product/$id/test/$pid?"(resource:"test")
		"/api/user/$id?"(resource:"user")
		
	}
}