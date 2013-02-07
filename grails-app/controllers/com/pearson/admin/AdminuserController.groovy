package com.pearson.admin

import grails.converters.JSON
import grails.util.GrailsUtil
import grails.validation.ValidationException

import org.codehaus.groovy.grails.commons.DefaultGrailsDomainClass
import org.hibernate.HibernateException

import com.pearson.hsc.AuthorizationService
import com.pearson.hsc.authenticate.FacebookUser
import com.pearson.hsc.authenticate.GoogleplusUser
import com.pearson.hsc.authenticate.LinkedinUser
import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.TwitterUser
import com.pearson.hsc.authenticate.User
import com.pearson.hsc.authenticate.UserRole

class AdminuserController {
	
	def springSecurityService
	def facebookAuthService
	def authorizationService
	
	/*
	 GET	show
	 PUT	update
	 POST	save
	 DELETE	delete
	 */
	def save = {
		def user = new User(params)
		def authority = params.userRole
		try {
			user.save(failOnError: true)
			Role role = Role.findByAuthority(authority)
			UserRole.create user, role, true
			render([success: true, user: user] as JSON)
			return
		} catch(ValidationException e){
			render([error: "Username already exists."] as JSON)
			return
		} 
		catch(HibernateException e){
			render([error: user.errors] as JSON)
			return
		}
	}
	
	def show = {
		def classLoader = Thread.currentThread().contextClassLoader
		def socialUsersConfig = new ConfigSlurper(GrailsUtil.environment).parse(classLoader.loadClass('SocialUsersConfig'));
		if(params.id) {
			def user = User.get(params.id)
			if(user) {
				def userPropMap = [:]
			
				String userRole = authorizationService.getUserRole(user)
				userPropMap.put("userRole", userRole)				
					
				def userProps =  new DefaultGrailsDomainClass(User.class).getPersistentProperties()
				userProps.each{prop ->
					userPropMap.put(prop.name, user[prop.name])
				}
				
				userPropMap.put("id", user["id"])
				
				render userPropMap as JSON			
				return
			} else {
				render "User Not found."
				return
			}
		}
		else {
			int numUsers = params.ipp.toInteger()
			int pageNum = params.page.toInteger()
			def returnList = []
			def allUsers = User.list(max:numUsers,offset:(pageNum-1)*numUsers)
			for(User user:allUsers){							
				String userRole = authorizationService.getUserRole(user)				
				if((userRole.equals(AuthorizationService.ROLE_FACEBOOK) && socialUsersConfig.userids.facebook.contains(user.username))
					|| (userRole.equals(AuthorizationService.ROLE_LINKEDIN) && socialUsersConfig.userids.linkedin.contains(user.username))
					|| (userRole.equals(AuthorizationService.ROLE_TWITTER) && socialUsersConfig.userids.twitter.contains(user.username))
					|| (userRole.equals(AuthorizationService.ROLE_GOOGLEPLUS) && socialUsersConfig.userids.googleplus.contains(user.username))){
					continue
				}
				
				def userPropMap = [:]
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
				
				returnList.add(userPropMap)
			}
			render returnList as JSON
			return
		}
	}
	
	def total = {
		def totalUsers = User.list().size()
		render totalUsers
	}
	
	
	def delete = {
		if(params.id) {
			User user = User.get(params.id)
			if(user){
				Set<Role> roles = user.getAuthorities()
				if(roles.contains(Role.findByAuthority("ROLE_FACEBOOK"))){
					FacebookUser fbUser = FacebookUser.findByUser(user)
					if(fbUser) {
						try {
							fbUser.delete()
							render ""
						} catch(HibernateException e){
							render (text:"could not delete user",status:500)
							return
						}
					}
				} 
				for(Role role : roles){
					UserRole.remove(user, role)
				}
				try {
					user.delete()
					render ""
				} catch(HibernateException e){
					render (text:"could not delete user",status:500)
					return
				}
			} else {
				render "User not found."
				return
			}
		}
		else {
			render "Please specify user id to be deletd."
		}
	}
	
	def update = {
		if(params.id) {
			def user = User.get(params.id)
			if(user) {
				user.properties = params
				try {
					user.save(failOnError: true, flush: true)
					render user as JSON
					return
				} catch(HibernateException e){
					render user.errors
					return
				}
			} else {
				render "User not found."
				return
			}
		}
		else {
			render "Please specify user id to be updated."
		}
	}
}