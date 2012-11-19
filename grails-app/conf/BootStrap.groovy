import com.pearson.hsc.Discipline
import groovy.json.JsonSlurper

class BootStrap {

    def init = { servletContext ->
		String jsonDisciplineData = new File(servletContext.getRealPath("/json/hsc/disciplines.json")).text
		
		if (!Discipline.count()) {
			def slurper = new JsonSlurper()
			def allDisciplines = slurper.parseText(jsonDisciplineData)
			
			allDisciplines.disciplines.each
			{
				new Discipline(name: it.name, description: it.description, thumbnail: it.thumbnail, image: it.image).save(failOnError: true)
			}
		}
    }
    def destroy = {
    }
}
