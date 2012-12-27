cgrails {
	skinning {
		baseskin = "default"
		defaultskin = "hsc"
		skins {
			hsc { parent = "default" }
		}
	}
	less {
		//Array of Less Files to compile.
		files = ["index", "indexadmin"]
	}
	offline {
		username = 'comprotest'
		password = 'compro'
	}
	javascriptMVC = "backbone"
}
environments {
	development {
		cgrails.cloudMode = false
	}
	production {
		cgrails.cloudMode = true
	}
}