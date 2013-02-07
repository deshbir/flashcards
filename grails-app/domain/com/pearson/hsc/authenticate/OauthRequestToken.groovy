package com.pearson.hsc.authenticate

import org.scribe.model.Token


class OauthRequestToken {

	String token		
	String secret	
	String rawResponse

	OauthRequestToken(Token token) {
		this.token = token.getToken()
		this.secret = token.getSecret()
		this.rawResponse = token.getRawResponse()
	}
}
