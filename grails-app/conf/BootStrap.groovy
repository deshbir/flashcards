import com.pearson.hsc.Discipline
import com.pearson.hsc.Product
import groovy.json.JsonSlurper

class BootStrap {

    def init = { servletContext ->
		String jsonDisciplineData = new File(servletContext.getRealPath("/json/hsc/disciplines.json")).text
		
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
						Product aProduct = new Product(name: it.name, description: it.description, thumbnail: it.thumbnail, image: it.image)
						
						if(jsonProduct.topics)
						{
							jsonProduct.topics.each	{
								aProduct.addToTopics(name: it.name, audioTrack: it.audioTrack, audioSequence: it.audioSequence)
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
