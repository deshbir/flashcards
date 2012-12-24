package com.pearson.hsc

import grails.converters.JSON

import org.hibernate.HibernateException

import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.User
import com.pearson.hsc.authenticate.UserRole

class UserController {
	
	def springSecurityService

	/*
	 GET	show
	 PUT	update
	 POST	save
	 DELETE	delete
	 */
	def save = {
		def user = new User(params)
		try {
			user.save(failOnError: true)
			List<Role> roleList = Role.findAllByAuthority("ROLE_USER")
			Role userRole = roleList.get(0)
			UserRole.create user, userRole, true
			render user as JSON
			return
		} catch(HibernateException e){
			render (text:user.errors,status:500)
			return
		}
	}
	
	def show = {
		if(params.id) {
			if(params.id.length() > 4) {
				def user = springSecurityService.currentUser
				render user as JSON
				return
			} else {
				def user = User.get(params.id)
				if(user) {
					render user as JSON
					return
				} else {
					render "User Not found."
					return
				}
			}
		}
		else {
			def allUsers = User.list()
			render allUsers as JSON
			return
		}
	}

	def delete = {
		if(params.id) {
			List<Role> roleList = Role.findAllByAuthority("ROLE_USER")
			Role userRole = roleList.get(0)
			def user = User.get(params.id)
			UserRole.remove(user, userRole, true);
			if(user) {
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
					user.save(failOnError: true)
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