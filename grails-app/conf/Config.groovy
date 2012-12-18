// locations to search for config files that get merged into the main config;
// config files can be ConfigSlurper scripts, Java properties files, or classes
// in the classpath in ConfigSlurper format

// grails.config.locations = [ "classpath:${appName}-config.properties",
//                             "classpath:${appName}-config.groovy",
//                             "file:${userHome}/.grails/${appName}-config.properties",
//                             "file:${userHome}/.grails/${appName}-config.groovy"]

// if (System.properties["${appName}.config.location"]) {
//    grails.config.locations << "file:" + System.properties["${appName}.config.location"]
// }

grails.project.groupId = appName // change this to alter the default package name and Maven publishing destination
grails.mime.file.extensions = true // enables the parsing of file extensions from URLs into the request format
grails.mime.use.accept.header = false
grails.mime.types = [
    all:           '*/*',
    atom:          'application/atom+xml',
    css:           'text/css',
    csv:           'text/csv',
    form:          'application/x-www-form-urlencoded',
    html:          ['text/html','application/xhtml+xml'],
    js:            'text/javascript',
    json:          ['application/json', 'text/json'],
    multipartForm: 'multipart/form-data',
    rss:           'application/rss+xml',
    text:          'text/plain',
    xml:           ['text/xml', 'application/xml']
]

// URL Mapping Cache Max Size, defaults to 5000
//grails.urlmapping.cache.maxsize = 1000

// What URL patterns should be processed by the resources plugin
//grails.resources.adhoc.patterns = ['/images/*', '/css/*', '/js/*', '/plugins/*']
grails.resources.adhoc.includes = []
grails.resources.adhoc.excludes = ["*"]

// The default codec used to encode data with ${}
grails.views.default.codec = "none" // none, html, base64
grails.views.gsp.encoding = "UTF-8"
grails.converters.encoding = "UTF-8"
// enable Sitemesh preprocessing of GSP pages
grails.views.gsp.sitemesh.preprocess = true
// scaffolding templates configuration
grails.scaffolding.templates.domainSuffix = 'Instance'

// Set to false to use the new Grails 1.2 JSONBuilder in the render method
grails.json.legacy.builder = false
// enabled native2ascii conversion of i18n properties files
grails.enable.native2ascii = true
// packages to include in Spring bean scanning
grails.spring.bean.packages = []
// whether to disable processing of multi part requests
grails.web.disable.multipart=false

// request parameters to mask when logging exceptions
grails.exceptionresolver.params.exclude = ['password']

// configure auto-caching of queries by default (if false you can cache individual queries with 'cache: true')
grails.hibernate.cache.queries = false

environments {
    development {
        grails.logging.jul.usebridge = true
		grails.resources.debug = true  // Add this line in development environment.
		grails.serverURL = "http://localhost:8080/flashcards" // server url for facebook
    }
    production {
        grails.logging.jul.usebridge = false
        // TODO: grails.serverURL = "http://www.changeme.com"
		grails.serverURL = "http://p-pearson-hsc.herokuapp.com" // server url for facebook
		
    }
}

// log4j configuration
log4j = {
    // Example of changing the log pattern for the default console appender:
    //
    //appenders {
    //    console name:'stdout', layout:pattern(conversionPattern: '%c{2} %m%n')
    //}

    error  'org.codehaus.groovy.grails.web.servlet',        // controllers
           'org.codehaus.groovy.grails.web.pages',          // GSP
           'org.codehaus.groovy.grails.web.sitemesh',       // layouts
           'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
           'org.codehaus.groovy.grails.web.mapping',        // URL mapping
           'org.codehaus.groovy.grails.commons',            // core / classloading
           'org.codehaus.groovy.grails.plugins',            // plugins
           'org.codehaus.groovy.grails.orm.hibernate',      // hibernate integration
           'org.springframework',
           'org.hibernate',
           'net.sf.ehcache.hibernate'
}
grails.converters.json.default.deep = true
grails.converters.default.circular.reference.behaviour="INSERT_NULL"

// Added by the Spring Security Core plugin:
grails.plugins.springsecurity.userLookup.userDomainClassName = 'com.pearson.hsc.authenticate.User'
grails.plugins.springsecurity.userLookup.authorityJoinClassName = 'com.pearson.hsc.authenticate.UserRole'
grails.plugins.springsecurity.authority.className = 'com.pearson.hsc.authenticate.Role'

grails.plugins.springsecurity.rememberMe.alwaysRemember = true

grails.plugins.springsecurity.logout.afterLogoutUrl = '/logout/after'

grails.plugins.springsecurity.securityConfigType = "InterceptUrlMap"
grails.plugins.springsecurity.interceptUrlMap = [
	'/*/singlepage/splash':['IS_AUTHENTICATED_ANONYMOUSLY'],
	'/*/singlepage/**':['ROLE_ADMIN','ROLE_FACEBOOK','ROLE_USER'],
	'/cgrailstemplate':['ROLE_ADMIN','ROLE_FACEBOOK','ROLE_USER'],
	'/api/**':['ROLE_ADMIN','ROLE_FACEBOOK','ROLE_USER']	
]
grails.plugins.springsecurity.facebook.domain.classname='com.pearson.hsc.authenticate.FacebookUser'
grails.plugins.springsecurity.facebook.appId='443347489063227'
grails.plugins.springsecurity.facebook.secret='a1432dcbc23c06047f0d826d520e6c21'


// Google Analaytics
google.analytics.webPropertyID = "UA-36885090-1"
//assets external path
hsc.media.assets.basepath = "http://s3.amazonaws.com/pearson-hsc/assets/"

// Cookie Session plugin configuration
//grails.plugin.cookiesession.enabled = true
//grails.plugin.cookiesession.encryptcookie = true
//grails.plugin.cookiesession.secret = "pearsonhsc"
//grails.plugin.cookiesession.cookiecount = 10
//grails.plugin.cookiesession.maxcookiesize = 3072
