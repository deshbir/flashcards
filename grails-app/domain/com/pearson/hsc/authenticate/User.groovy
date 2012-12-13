package com.pearson.hsc.authenticate

class User {

	transient springSecurityService

	String username
	String password
	String firstName
	String lastName
	String email
	boolean enabled
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
	boolean isAdmin = false

	static constraints = {
		username blank: false, unique: true
		password blank: false
	}

	static mapping = {
		table 'hsc_user'
		password column: '`password`'
	}

	Set<Role> getAuthorities() {
		UserRole.findAllByUser(this).collect { it.role } as Set
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService.encodePassword(password)
	}
}
