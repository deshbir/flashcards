package com.pearson.admin

import grails.converters.JSON
import grails.validation.ValidationException

import org.hibernate.HibernateException

import com.pearson.hsc.authenticate.FacebookUser
import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.User
import com.pearson.hsc.authenticate.UserRole

class AdminuserController {
	
	def springSecurityService
	def facebookAuthService
	
	/*
	 GET	show
	 PUT	update
	 POST	save
	 DELETE	delete
	 */
	def save = {
		def user = new User(params)
		def authority = params.userRole
		if (authority.equals("ROLE_ADMIN")) {
			user.isAdmin = true
		}
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
		if(params.id) {
			def user = User.get(params.id)
			if(user) {
				render user as JSON
				return
			} else {
				render "User Not found."
				return
			}
		}
		else {
			int numUsers = params.ipp.toInteger()
			int pageNum = params.page.toInteger()
			def allUsers = User.list(max:numUsers,offset:(pageNum-1)*numUsers)
			render allUsers as JSON
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
				user.properties = params['user']
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