package com.pearson.hsc.authenticate


class LinkedinUser {

	String memberId	
	
	String pictureUrl

	static belongsTo = [user: User]

	static constraints = {
		memberId unique: true
	}
}