dataSource {
    pooled = true
    driverClassName = "org.h2.Driver"
    username = "sa"
    password = ""
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory'
}
// environment specific settings
environments {
    development {
        dataSource {
            dbCreate = "create-drop" // one of 'create', 'create-drop', 'update', 'validate', ''
            url = "jdbc:h2:mem:devDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
        }
    }
    test {
        dataSource {
            dbCreate = "update"
            url = "jdbc:h2:mem:testDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
        }
    }
    production {
		
		/*
		 *  Uncomment for Local H2 
		 */
		/*
        dataSource {
            dbCreate = "create-drop"
			
			
			//dialect = org.hibernate.dialect.MySQLInnoDBDialect
			//driverClassName = 'com.mysql.jdbc.Driver'
			//url = 'jdbc:mysql://localhost:3306/db?useUnicode=true&characterEncoding=utf8'
			
            url = "jdbc:h2:prodDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
			username = ""
			password = ""
			pooled = true
            properties {
               maxActive = -1
               minEvictableIdleTimeMillis=1800000
               timeBetweenEvictionRunsMillis=1800000
               numTestsPerEvictionRun=3
               testOnBorrow=true
               testWhileIdle=true
               testOnReturn=true
               validationQuery="SELECT 1"
            }
        }
		
		*/
		
			/*
			 * Heroku automatically provisions a small database when you create a Grails application 
			 * and sets the DATABASE_URL environment variable to a URL of the format
   			 * postgres://user:password@hostname:port/dbname
			*/	
		
			dataSource {
				dbCreate = "update"
				driverClassName = "org.postgresql.Driver"
				dialect = org.hibernate.dialect.PostgreSQLDialect
			
				uri = new URI(System.env.DATABASE_URL?:"postgres://test:test@localhost/test")
		
				url = "jdbc:postgresql://"+uri.host + ":" + uri.port +uri.path
				username = uri.userInfo.split(":")[0]
				password = uri.userInfo.split(":")[1]
				pooled = true
			}
		
    }
}
