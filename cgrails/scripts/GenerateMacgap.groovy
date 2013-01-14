import org.codehaus.groovy.grails.web.context.ServletContextHolder
import org.codehaus.groovy.grails.web.servlet.GrailsApplicationAttributes


includeTargets << new File("${cgrailsPluginDir}/scripts/GenerateOffline.groovy")


target(air: "Generates Offline MACGAP version of the application") {  
   depends(generate)
   
   grailsConsole.updateStatus "Started Generating MACGAP offline version.....";
   
   def applicationContext = ServletContextHolder.getServletContext().getAttribute(GrailsApplicationAttributes.APPLICATION_CONTEXT)
   def macgapApplicationBuilder = applicationContext.getBean("macgapApplicationBuilder");
   
   grailsConsole.updateStatus "Cleaning older MACGAP package......";
   macgapApplicationBuilder.deleteOldPackage();  
   grailsConsole.updateStatus "Successfully Cleaned older AIR package.....";
   
   grailsConsole.updateStatus "Creating MACGAP package......";   
   macgapApplicationBuilder.generateMacgap();  
   grailsConsole.updateStatus "Successfully created MACGAP package.....";
   
   grailsConsole.updateStatus "MACGAP offline version successfully generated.....";
   
}

 
setDefaultTarget(air)
