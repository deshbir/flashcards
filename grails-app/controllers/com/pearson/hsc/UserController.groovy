package com.pearson.hsc

import grails.converters.JSON

import org.codehaus.groovy.grails.commons.DefaultGrailsDomainClass

import com.pearson.hsc.authenticate.GoogleplusUser
import com.pearson.hsc.authenticate.LinkedinUser
import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.TwitterUser
import com.pearson.hsc.authenticate.User


class UserController {

	/**
	 * Dependency injection for the springSecurityService.
	 */
	def springSecurityService
	
	/**
	 * Dependency injection for the authorizationService.
	 */
	def authorizationService

	def show = {		
		def user = springSecurityService.currentUser		
		if(user){
			def userPropMap = [:]
			
			String userRole = authorizationService.getUserRole(user)
			userPropMap.put("userRole", userRole)
			
			if (userRole.equals(AuthorizationService.ROLE_LINKEDIN)) {
				def linkedinUser = LinkedinUser.findByUser(user)
				userPropMap.put("pictureUrl", linkedinUser.pictureUrl)					
			} else if (userRole.equals(AuthorizationService.ROLE_TWITTER)) {
				def twitterUser = TwitterUser.findByUser(user)
				userPropMap.put("pictureUrl", twitterUser.pictureUrl)
			} else if (userRole.equals(AuthorizationService.ROLE_GOOGLEPLUS)) {
				def googleplusUser = GoogleplusUser.findByUser(user)
				userPropMap.put("pictureUrl", googleplusUser.pictureUrl)
			} 
				
			def userProps =  new DefaultGrailsDomainClass(User.class).getPersistentProperties()
			userProps.each{prop ->
				userPropMap.put(prop.name, user[prop.name])
			}
			userPropMap.put("id", user["id"])
			render userPropMap as JSON			
		}
		else{
			render([error: true] as JSON)
		}
		return		
	}
}