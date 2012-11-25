import com.pearson.hsc.Discipline
import com.pearson.hsc.Product
import com.pearson.hsc.Test
import com.pearson.hsc.Question
import com.pearson.hsc.authenticate.Role
import com.pearson.hsc.authenticate.User
import com.pearson.hsc.authenticate.UserRole
import groovy.json.JsonSlurper

class BootStrap {

    def init = { servletContext ->
		String jsonDisciplineData = new File(servletContext.getRealPath("/json/hsc/disciplines.json")).text
		Product aProduct
		
		new Role(authority: 'ROLE_USER').save(failOnError: true, flush: true)
		new Role(authority: 'ROLE_FACEBOOK').save(failOnError: true, flush: true)
		def adminRole = new Role(authority: 'ROLE_ADMIN').save(flush: true)
		def testUser = new User(username: 'comprotest', enabled: true, password: 'compro')
		testUser.save(flush: true)
		UserRole.create testUser, adminRole, true
		
		if (!Discipline.count()) {
			def slurper = new JsonSlurper()
			def allDisciplines = slurper.parseText(jsonDisciplineData)
			
			allDisciplines.disciplines.each	{
				def jsonDiscipline = it 
				def aDiscipline = new Discipline(name: it.name, description: it.description, thumbnail: it.thumbnail, image: it.image).save(failOnError: true)
				
				if(jsonDiscipline.products)
				{
					jsonDiscipline.products.each	{
						
						def jsonProduct = it
						aProduct = new Product(name: it.name, description: it.description, thumbnail: it.thumbnail, image: it.image)
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
										aTest.addToQuestions(type:it.type,text:it.text,sequence:it.sequence,maxscore:it.maxscore, mediatype:it.mediatype,imageurl:it.imageurl,audiourl:it.audiourl,videourl:it.videourl,option1:it.option1,option2:it.option2,option3:it.option3,option4:it.option4,option5:it.option5,option6:it.option6,option7:it.option7,answer1:it.answer1,answer2: it.answer2, answer3: it.answer3, answer4: it.answer4)
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
    def destroy = {
    }
}
