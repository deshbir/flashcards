import com.pearson.hsc.Discipline
import com.pearson.hsc.Product
import com.pearson.hsc.Test
import com.pearson.hsc.Question
import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.User
import com.pearson.hsc.authenticate.UserRole
import groovy.json.JsonSlurper

class BootStrap {
	
	def grailsApplication
	
	def bootstrap_user_data =	{ servletContext ->
		def userRole; 
		def adminRole;
		if (!Role.count()) {
			userRole = new Role(authority: 'ROLE_USER').save(failOnError: true, flush: true)
			def facebookRole = new Role(authority: 'ROLE_FACEBOOK').save(failOnError: true, flush: true)
			adminRole = new Role(authority: 'ROLE_ADMIN').save(failOnError: true, flush: true)
		}
		
		if (!User.count()) {
			def appUser = new User(username: 'hsc@pearson.com', firstName: 'John', lastName: 'Doe',enabled: true, password: 'compro', email: 'email@compro.com', isFacebookUser: false)
			appUser.save(flush: true)
			
			def adminUser = new User(username: 'admin@compro.com', firstName: 'Compro', lastName: 'Admin',enabled: true, password: 'admin', email: 'admin@compro.com', isAdmin:true, isFacebookUser: false)
			adminUser.save(flush: true)

			def lisaUser = new User(username: 'lisa.strite@pearson.com', firstName: 'Lisa', lastName: 'Strite',enabled: true, password: 'pearson2013', email: 'lisa.strite@pearson.com', isAdmin:true, isFacebookUser: false)
			lisaUser.save(flush: true)

			def hscUser = new User(username: 'hsc', firstName: 'Default', lastName: 'User',enabled: true, password: 'breakthrough', email: 'hsc@pearson.com', isAdmin:false, isFacebookUser: false)
			hscUser.save(flush: true)
			
			UserRole.create appUser, userRole, true
			UserRole.create hscUser, userRole, true
			UserRole.create adminUser, adminRole, true
			UserRole.create lisaUser, adminRole, true
		}

	}
	
	def bootstrap_disciplines =	{ servletContext ->
		
		String jsonDisciplineData = new File(servletContext.getRealPath("/json/hsc/discipline_master.json")).text
		
		if (!Discipline.count()) {
			def slurper = new JsonSlurper()
			def allDisciplines = slurper.parseText(jsonDisciplineData)
		
			allDisciplines.disciplines.each	{
				def jsonDiscipline = it
				def aDiscipline = new Discipline(name: it.name, description: it.description, thumbnail: it.thumbnail, image: it.image, sequence: it.sequence).save(failOnError: true)
				
				def product_data_filename =  it.product_data_filename;
				
				if(product_data_filename)
				{
				
					String  jsonProductData = new File(servletContext.getRealPath("/json/hsc/" + product_data_filename)).text
					def allProducts = slurper.parseText(jsonProductData)
					
					def aProduct
					
					allProducts.products.each	{
						
						def jsonProduct = it
						aProduct = new Product(name: it.name, description: it.description, thumbnail: it.thumbnail, image: it.image, sequence: it.sequence, type: it.type, author: it.author)
						Test aTest
						if(jsonProduct.topics)
						{
							jsonProduct.topics.each	{
								aProduct.addToTopics(name: it.name, audioTrack: it.audioTrack, sequence: it.sequence)
							}
						}
						
						if(jsonProduct.tests)
						{
							jsonProduct.tests.each	{
								def jsonTest = it
								aTest = new Test(name: it.name, instructions: it.instructions)
								if(jsonTest.questions)
								{
									jsonTest.questions.each	{
										aTest.addToQuestions(type:it.type,text:it.text,sequence:it.sequence,maxscore:it.maxscore, mediatype:it.mediatype,imageurl:it.imageurl,audiourl:it.audiourl,videourl:it.videourl,option1:it.option1,option2:it.option2,option3:it.option3,option4:it.option4,option5:it.option5,option6:it.option6,option7:it.option7,answer1:it.answer1,answer2: it.answer2, answer3: it.answer3, answer4: it.answer4, answerDetails: it.answerDetails)
									}
								}
								aProduct.addToTests(aTest)
							}
							
						}
						aDiscipline.addToProducts (aProduct).save(failOnError: true)
					}
					
				
				}
		
			}
			
		}

	}
	
	def updateGrailsConfigForHeroku() {
		String environment = System.getProperty("newrelic.environment");
		if (environment.equals("development")) {
			grailsApplication.config.grails.serverURL = grailsApplication.config.dev.grails.serverURL
			grailsApplication.config.google.analytics.webPropertyID = grailsApplication.config.dev.google.analytics.webPropertyID
		} else if (environment.equals("test")) {
			grailsApplication.config.grails.serverURL =  grailsApplication.config.test.grails.serverURL
			grailsApplication.config.google.analytics.webPropertyID = grailsApplication.config.test.google.analytics.webPropertyID
		} else if (environment.equals("production")) {
			grailsApplication.config.grails.serverURL =  grailsApplication.config.prod.grails.serverURL
			grailsApplication.config.google.analytics.webPropertyID = grailsApplication.config.prod.google.analytics.webPropertyID
		}		
	}
	

	def init = { servletContext ->
		updateGrailsConfigForHeroku();
		bootstrap_user_data(servletContext)
		bootstrap_disciplines(servletContext)
		System.out.println("Application startup completed...")
		System.out.println("Environment: " + System.getProperty("newrelic.environment"))
		System.out.println("Server URL: " + grailsApplication.config.grails.serverURL)
		System.out.println("Google Analytics ID: " + grailsApplication.config.google.analytics.webPropertyID)
	}
	
	def destroy = {
	}
}
