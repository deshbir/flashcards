package com.pearson.hsc

import org.scribe.builder.ServiceBuilder
import org.scribe.builder.api.GoogleApi
import org.scribe.builder.api.LinkedInApi
import org.scribe.builder.api.TwitterApi
import org.scribe.oauth.OAuthService

import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.User


class AuthorizationService {
	
	def grailsApplication 
	
	private static OAuthService linkedinService = null;
	private static OAuthService twitterService = null;
	private static OAuthService googleplusService = null;
	
	public static final String LINKEDIN_PROVIDER = "linkedin"
	public static final String TWITTER_PROVIDER = "twitter"
	public static final String GOOGLEPLUS_PROVIDER = "googleplus"	
	
	public static final String ROLE_USER = "ROLE_USER"
	public static final String ROLE_ADMIN = "ROLE_ADMIN"
	public static final String ROLE_LINKEDIN = "ROLE_LINKEDIN"
	public static final String ROLE_FACEBOOK = "ROLE_FACEBOOK"
	public static final String ROLE_TWITTER = "ROLE_TWITTER"
	public static final String ROLE_GOOGLEPLUS = "ROLE_GOOGLEPLUS"
	
	
	public String getUserRole(User user) {
		String userRole = ROLE_USER;
		
		Set<Role> roles = user.getAuthorities()
		if(roles.contains(Role.findByAuthority(ROLE_ADMIN))){
			userRole = ROLE_ADMIN
		} else if(roles.contains(Role.findByAuthority(ROLE_FACEBOOK))){
			userRole = ROLE_FACEBOOK
		} else if(roles.contains(Role.findByAuthority(ROLE_LINKEDIN))){
			userRole = ROLE_LINKEDIN
		} else if(roles.contains(Role.findByAuthority(ROLE_TWITTER))){
			userRole = ROLE_TWITTER
		} else if(roles.contains(Role.findByAuthority(ROLE_GOOGLEPLUS))){
			userRole = ROLE_GOOGLEPLUS
		}
		 
		return userRole
	} 
	
	public OAuthService getOAuthService(String provider) {
		if (provider.equals(LINKEDIN_PROVIDER)) {
			return getLinkedinService()
		} else if (provider.equals(TWITTER_PROVIDER)) {
			return getTwitterService()
		} else if (provider.equals(GOOGLEPLUS_PROVIDER)) {
			return getGoogleplusService()
		}
	}
	
	public String getUserDetailsApi(String provider) {
		if (provider.equals(LINKEDIN_PROVIDER)) {
			return "http://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)"
		} else if (provider.equals(TWITTER_PROVIDER)) {
			return "http://api.twitter.com/1/account/verify_credentials.xml"
		} else if (provider.equals(GOOGLEPLUS_PROVIDER)) {
			return "https://www.googleapis.com/oauth2/v1/userinfo"
		}
	}
	
	public OAuthService getLinkedinService() {
		if (linkedinService == null) {
			linkedinService = new ServiceBuilder()
								.provider(LinkedInApi.class)
								.apiKey(grailsApplication.config.linkedin.api.key)
								.apiSecret(grailsApplication.config.linkedin.secret.key)
								.callback(grailsApplication.config.grails.serverURL + "/login/social/" + LINKEDIN_PROVIDER + "/callback")
								.scope("r_basicprofile")
								.scope("r_emailaddress")
								.build();
		}
		return linkedinService
	}
	
	public OAuthService getTwitterService() {
		if (twitterService == null) {
			twitterService = new ServiceBuilder()
								.provider(TwitterApi.class)
								.apiKey(grailsApplication.config.twitter.api.key)
								.apiSecret(grailsApplication.config.twitter.secret.key)
								.callback(grailsApplication.config.grails.serverURL + "/login/social/" + TWITTER_PROVIDER + "/callback")
								.build();
		}
		return twitterService
	}
	
	public OAuthService getGoogleplusService() {
		if (googleplusService == null) {
			googleplusService = new ServiceBuilder()
								.provider(GoogleApi.class)
								.apiKey(grailsApplication.config.googleplus.api.key)
								.apiSecret(grailsApplication.config.googleplus.secret.key)
								.callback(grailsApplication.config.grails.serverURL + "/login/social/" + GOOGLEPLUS_PROVIDER + "/callback")
								.scope("https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email")
								.build();
		}
		return googleplusService
	}
	
	
}