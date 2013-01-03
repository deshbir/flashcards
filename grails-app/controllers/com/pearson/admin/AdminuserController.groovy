package com.pearson.admin

import grails.converters.JSON

import org.hibernate.HibernateException

import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.User
import com.pearson.hsc.authenticate.UserRole

class AdminuserController {
	
	def springSecurityService

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
			List<Role> roleList = Role.findAllByAuthority(authority)
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
			def user = User.get(params.id)
			def userRole = UserRole.findByUser(user)
			userRole.delete()
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
					user.save(failOnError: true, flush: true,validate:false, insert:false)
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