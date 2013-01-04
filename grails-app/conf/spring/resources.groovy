import org.codehaus.groovy.grails.plugins.springsecurity.SpringSecurityUtils

// Place your Spring DSL code here
beans = {
	def securityConf = SpringSecurityUtils.securityConfig
	authenticationFailureHandler(com.pearson.hsc.springsecurity.CustomAjaxAwareAuthenticationFailureHandler) {
		redirectStrategy = ref('redirectStrategy')
		defaultFailureUrl = securityConf.failureHandler.defaultFailureUrl //'/login/authfail?login_error=1'
		useForward = securityConf.failureHandler.useForward // false
		ajaxAuthenticationFailureUrl = securityConf.failureHandler.ajaxAuthFailUrl // '/login/authfail?ajax=true'
		exceptionMappings = securityConf.failureHandler.exceptionMappings // [:]
	}
}
