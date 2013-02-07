package com.pearson.hsc

import grails.converters.JSON

import javax.servlet.http.HttpServletResponse

import org.codehaus.groovy.grails.plugins.springsecurity.SpringSecurityUtils
import org.codehaus.groovy.grails.web.json.JSONObject
import org.scribe.model.OAuthRequest
import org.scribe.model.Response
import org.scribe.model.Token
import org.scribe.model.Verb
import org.scribe.model.Verifier
import org.scribe.oauth.OAuthService
import org.springframework.security.authentication.AccountExpiredException
import org.springframework.security.authentication.CredentialsExpiredException
import org.springframework.security.authentication.DisabledException
import org.springframework.security.authentication.LockedException
import org.springframework.security.core.context.SecurityContextHolder as SCH
import org.springframework.security.web.WebAttributes
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

import com.pearson.hsc.authenticate.GoogleplusUser
import com.pearson.hsc.authenticate.LinkedinUser
import com.pearson.hsc.authenticate.OauthRequestToken
import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.TwitterUser
import com.pearson.hsc.authenticate.User
import com.pearson.hsc.authenticate.UserRole

class LoginController {

	/**
	 * Dependency injection for the authenticationTrustResolver.
	 */
	def authenticationTrustResolver

	/**
	 * Dependency injection for the springSecurityService.
	 */
	def springSecurityService
	
	/**
	 * Dependency injection for the rememberMeServices.
	 */
	def rememberMeServices
	
	/**
	 * Dependency injection for the authorizationService.
	 */
	def authorizationService
	

	/**
	 * Default action; redirects to 'defaultTargetUrl' if logged in, /login/auth otherwise.
	 */
	def index = {
		if (springSecurityService.isLoggedIn()) {
			redirect uri: SpringSecurityUtils.securityConfig.successHandler.defaultTargetUrl
		}
		else {
			redirect action: 'auth', params: params
		}
	}

	/**
	 * Show the login page.
	 */
	def auth = {
		redirect uri:"/"
		return	

//		def config = SpringSecurityUtils.securityConfig
//
//		if (springSecurityService.isLoggedIn()) {
//			redirect uri: config.successHandler.defaultTargetUrl
//			return
//		}
//
//		String view = '/login'
//		String postUrl = "${request.contextPath}${config.apf.filterProcessesUrl}"
//		render view: view, model: [postUrl: postUrl,
//		                           rememberMeParameter: config.rememberMe.parameter]
	}

	/**
	 * The redirect action for Ajax requests.
	 */
	def authAjax = {
		response.setHeader 'Location', SpringSecurityUtils.securityConfig.auth.ajaxLoginFormUrl
		response.sendError HttpServletResponse.SC_UNAUTHORIZED
	}

	/**
	 * Show denied page.
	 */
	def denied = {
		if (springSecurityService.isLoggedIn() &&
				authenticationTrustResolver.isRememberMe(SCH.context?.authentication)) {
			// have cookie but the page is guarded with IS_AUTHENTICATED_FULLY
			redirect action: 'full', params: params
		}
		render view:'/denied'		
	}

	/**
	 * Login page for users with a remember-me cookie but accessing a IS_AUTHENTICATED_FULLY page.
	 */
	def full = {
		def config = SpringSecurityUtils.securityConfig
		render view: 'auth', params: params,
			model: [hasCookie: authenticationTrustResolver.isRememberMe(SCH.context?.authentication),
			        postUrl: "${request.contextPath}${config.apf.filterProcessesUrl}"]
	}

	/**
	 * Callback after a failed login. Redirects to the auth page with a warning message.
	 */
	def authfail = {

		def username = session[UsernamePasswordAuthenticationFilter.SPRING_SECURITY_LAST_USERNAME_KEY]
		String msg = ''
		def exception = session[WebAttributes.AUTHENTICATION_EXCEPTION]
		if (exception) {
			if (exception instanceof AccountExpiredException) {
				msg = g.message(code: "springSecurity.errors.login.expired")
			}
			else if (exception instanceof CredentialsExpiredException) {
				msg = g.message(code: "springSecurity.errors.login.passwordExpired")
			}
			else if (exception instanceof DisabledException) {
				msg = g.message(code: "springSecurity.errors.login.disabled")
			}
			else if (exception instanceof LockedException) {
				msg = g.message(code: "springSecurity.errors.login.locked")
			}
			else {
				//msg = g.message(code: "springSecurity.errors.login.fail")
				msg = "Sorry, we're not able to match your username and/or password. Please try again."
			}
		}

		if (springSecurityService.isAjax(request)) {
			render([error: msg] as JSON)
		}
		else {
			flash.message = msg
			redirect action: 'auth', params: params
		}
	}

	/**
	 * The Ajax success redirect url.
	 */
	def ajaxSuccess = {		
		String userRole = authorizationService.getUserRole(springSecurityService.currentUser)
		render([success: true, userRole: userRole] as JSON)
	}

	/**
	 * The Ajax denied redirect url.
	 */
	def ajaxDenied = {
		render([error: 'access denied'] as JSON)
	}
	
	/**
	 * Facebook login success handler (in case of standalone web apps).
	 */
	def facebookLoginSuccess() {
		System.out.println("Facebook login success...");
		System.out.println("Server URL: " + grailsApplication.config.grails.serverURL);
		System.out.println("Request URI: " + request.forwardURI);		
		redirect(url: grailsApplication.config.grails.serverURL + "/?isFacebookLoginSuccess=true")
		//redirect(controller:"singlepage", action: "index", params: [isFacebookLoginSuccess: true])
	}
	
	def social() {
		OAuthService oAuthService = authorizationService.getOAuthService(params["provider"])
		Token requestToken = oAuthService.getRequestToken();
		OauthRequestToken oauthRequestToken = new OauthRequestToken(requestToken)
		oauthRequestToken.save(flush: true)
		String url = oAuthService.getAuthorizationUrl(requestToken);
		return redirect (url:url)
	}
	
	def socialcallback() {		
		Verifier verifier = new Verifier(params["oauth_verifier"])
		OauthRequestToken oauthRequestToken = OauthRequestToken.findWhere(token: params["oauth_token"])
		Token requestToken = new Token(oauthRequestToken.token, oauthRequestToken.secret,
											 oauthRequestToken.rawResponse)
		oauthRequestToken.delete()
		
		String provider = params["provider"]
		OAuthService oAuthService = authorizationService.getOAuthService(provider)
		Token accessToken = oAuthService.getAccessToken(requestToken, verifier)
		
		OAuthRequest oAuthRequest = new OAuthRequest(Verb.GET, authorizationService.getUserDetailsApi(provider));
		oAuthService.signRequest(accessToken, oAuthRequest);
		Response oAuthResponse = oAuthRequest.send();
		
		String memberId, firstName, lastName, emailAddress, pictureUrl
		def appUser = null
		
		if (provider.equals(authorizationService.LINKEDIN_PROVIDER)) {
			def responseXML = new XmlParser().parseText(oAuthResponse.getBody())
		    memberId = responseXML."id".text()	
		    firstName = responseXML."first-name".text()
			lastName = responseXML."last-name".text()
			emailAddress = responseXML."email-address".text()
			pictureUrl = responseXML."picture-url".text()
			
			def linkedinUser = LinkedinUser.findWhere(memberId: memberId)
			
			if (linkedinUser == null) {
				appUser = new User(username: memberId, firstName: firstName, lastName:lastName, 
									enabled: true, password: System.currentTimeMillis(), email: emailAddress)
				appUser.save(flush: true)
	
				linkedinUser = new LinkedinUser(user:appUser, memberId: memberId, pictureUrl:pictureUrl)
				linkedinUser.save(flush: true)
	
				Role linkedinRole = Role.find {authority == "ROLE_LINKEDIN"}
				UserRole.create appUser, linkedinRole, true
			} else {
				linkedinUser.pictureUrl = pictureUrl
				linkedinUser.save(flush: true)
				
				appUser = User.get(linkedinUser["userId"])
				appUser.firstName = firstName
				appUser.lastName = lastName
				appUser.email = emailAddress
				appUser.save(flush: true)
			}
		} else if (provider.equals(authorizationService.TWITTER_PROVIDER)) {
			def responseXML = new XmlParser().parseText(oAuthResponse.getBody())
			memberId = responseXML."id".text()
			pictureUrl = responseXML."profile_image_url".text()		
			String name = responseXML."name".text()
			String[] parts = name.split(" ");
			firstName = parts[0]
			lastName = parts[1]
			emailAddress = ""	
			
			def twitterUser = TwitterUser.findWhere(memberId: memberId)
			
			if (twitterUser == null) {
				appUser = new User(username: memberId, firstName: firstName, lastName:lastName,
									enabled: true, password: System.currentTimeMillis(), email: emailAddress)
				appUser.save(flush: true)
	
				twitterUser = new TwitterUser(user:appUser, memberId: memberId, pictureUrl:pictureUrl)
				twitterUser.save(flush: true)
	
				Role twitterRole = Role.find {authority == "ROLE_TWITTER"}
				UserRole.create appUser, twitterRole, true
			} else {
				twitterUser.pictureUrl = pictureUrl
				twitterUser.save(flush: true)
				
				appUser = User.get(twitterUser["userId"])
				appUser.firstName = firstName
				appUser.lastName = lastName
				appUser.email = emailAddress
				appUser.save(flush: true)
			}
		} else if (provider.equals(authorizationService.GOOGLEPLUS_PROVIDER)) {
			JSONObject responseJson = new JSONObject(oAuthResponse.getBody())
			memberId = responseJson.get("id")	
			if (responseJson.has("picture")) {
				pictureUrl = "https://profiles.google.com/s2/photos/profile/" + memberId + "?sz=50"
			} else {
				pictureUrl = ""
			}				
			firstName = responseJson.get("given_name")
			lastName = responseJson.get("family_name")
			emailAddress = responseJson.get("email")
			
			def googleplusUser = GoogleplusUser.findWhere(memberId: memberId)
			
			if (googleplusUser == null) {
				appUser = new User(username: memberId, firstName: firstName, lastName:lastName,
									enabled: true, password: System.currentTimeMillis(), email: emailAddress)
				appUser.save(flush: true)
	
				googleplusUser = new GoogleplusUser(user:appUser, memberId: memberId, pictureUrl:pictureUrl)
				googleplusUser.save(flush: true)
	
				Role googleplusRole = Role.find {authority == "ROLE_GOOGLEPLUS"}
				UserRole.create appUser, googleplusRole, true
			} else {
				googleplusUser.pictureUrl = pictureUrl
				googleplusUser.save(flush: true)
				
				appUser = User.get(googleplusUser["userId"])
				appUser.firstName = firstName
				appUser.lastName = lastName
				appUser.email = emailAddress
				appUser.save(flush: true)
			}
		}
		
		springSecurityService.reauthenticate(appUser["username"], appUser["password"])
		rememberMeServices.onLoginSuccess(request, response, springSecurityService.authentication)

		return redirect(url:"/#/discipline")
	}
}
