import com.pearson.hsc.Discipline
import com.pearson.hsc.Product
import com.pearson.hsc.Test
import com.pearson.hsc.Question
import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.User
import com.pearson.hsc.authenticate.UserRole
import groovy.json.JsonSlurper

class BootStrap {
	
	def bootstrap_user_data =	{ servletContext ->
		
		def userRole = new Role(authority: 'ROLE_USER').save(failOnError: true, flush: true)
		def facebookRole = new Role(authority: 'ROLE_FACEBOOK').save(failOnError: true, flush: true)
		def adminRole = new Role(authority: 'ROLE_ADMIN').save(failOnError: true, flush: true)
		
		def appUser = new User(username: 'pearson-hsc', firstName: 'John', lastName: 'Doe',enabled: true, password: 'compro', email: 'email@compro.com')
		appUser.save(flush: true)
		
		def adminUser = new User(username: 'admin', firstName: 'Compro', lastName: 'Admin',enabled: true, password: 'admin', email: 'admin@compro.com')
		adminUser.save(flush: true)
		
		UserRole.create appUser, userRole, true
		UserRole.create adminUser, adminRole, true

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
						aProduct = new Product(name: it.name, description: it.description, thumbnail: it.thumbnail, image: it.image, sequence: it.sequence, author: it.author)
						Test aTest
						if(jsonProduct.topics)
						{
							jsonProduct.topics.each	{
								aProduct.addToTopics(name: it.name, audioTrack: it.audioTrack, audioSequence: it.audioSequence)
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
	

	def init = { servletContext ->
		
		bootstrap_user_data(servletContext);
		bootstrap_disciplines(servletContext);
	
	}
	
	def destroy = {
	}
}
