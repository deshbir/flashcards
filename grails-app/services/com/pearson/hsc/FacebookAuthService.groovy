package com.pearson.hsc

import grails.converters.JSON
import net.sf.json.JSONObject

import com.pearson.hsc.authenticate.User
import com.the6hours.grails.springsecurity.facebook.FacebookAuthDao
import com.the6hours.grails.springsecurity.facebook.FacebookAuthToken

class FacebookAuthService {
	FacebookAuthDao facebookAuthDao
	void prepopulateAppUser(User user, FacebookAuthToken token) {
		def accessToken  = token.accessToken?.accessToken	
		if(accessToken){
			String authUrl = "https://graph.facebook.com/me?access_token=$accessToken"
			URL url = new URL(authUrl)
			JSONObject me = JSON.parse(url.readLines().first())
			user.password = me.first_name.toLowerCase()
			user.username = me.id
			user.accountExpired = false
			user.accountLocked = false
			user.enabled = true
			user.passwordExpired = false
			user.email = me.email
			user.firstName = me.first_name
			user.lastName = me.last_name
			user.isAdmin = false
			user.isFacebookUser = true
		}
	}
	
	
}