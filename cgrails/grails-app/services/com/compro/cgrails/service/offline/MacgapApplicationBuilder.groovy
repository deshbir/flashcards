package  com.compro.cgrails.service.offline

class MacgapApplicationBuilder {	
	
	def OfflineApplicationBuilder
	
	private static final String MACGAP_DIR_PATH = "macgap/"
	private static final String MACGAP_CORE_DIR = "core"
	
	public void generateMacgap() {	
		
		File offlineCoreDir = new File(OfflineApplicationBuilder.OFFLINE_PACKAGE_DIR_PATH);		
		File targetMacgapAppDir = new File(OfflineApplicationBuilder.TARGET_OFFLINE_DIR_PATH
									+ MACGAP_DIR_PATH);
	    String macgapAppDirAbsPath = targetMacgapAppDir.getAbsolutePath();						
		File targetMacgapAppCoreDir = new File(OfflineApplicationBuilder.TARGET_OFFLINE_DIR_PATH 
										+ MACGAP_DIR_PATH + MACGAP_CORE_DIR);									
		
		OfflineApplicationBuilder.copyDirectory(offlineCoreDir, targetMacgapAppCoreDir);
		
		"macgap build --name hsc --output ./build ./core".execute(null, macgapAppDirAbsPath);
	}
	
	public void deleteOldPackage() {
		File sourceFile = new File(OfflineApplicationBuilder.TARGET_OFFLINE_DIR_PATH + MACGAP_DIR_PATH)
		sourceFile.deleteDir();
	}
}
