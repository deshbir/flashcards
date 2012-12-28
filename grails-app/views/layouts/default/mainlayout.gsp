<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<g:set var="direction" value="${CgrailsUtils.getOrientation()}" />
<!DOCTYPE html>
<html manifest="cache.appcache">
	<head>
		<g:if test="${isFacebookLoginSuccess}">
			<script src="//connect.facebook.net/en_US/all.js" id="facebook-jssdk"></script>
		</g:if>	
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Pearson HSC</title>

        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
		<meta name="apple-mobile-web-app-capable" content="yes" />
		
		<meta name="description" content="Pearson HSC, 2013">
		<meta name="author" content="Compro Technologies Pvt. Ltd.">

	    <cgrails:stylesheet src="index"/>
	    <r:require modules="common, application"/>
	    
		<cgrails:environment_setup/>	    
	    <g:layoutHead/>	    
		<r:layoutResources/>
		
		<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		
        <!-- iPhone ICON-->
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="<r:resource uri="/images/apple-touch-icon.png"/>" />
        <!-- iPhone (Retina) ICON-->
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<r:resource uri="/images/apple-touch-icon-retina.png"/>"/>
        <!-- iPad ICON-->
        <link  rel="apple-touch-icon-precomposed" sizes="72x72" href="<r:resource uri="/images/ipad-touch-icon.png"/>" />
        <!-- iPad (Retina) ICON-->
        <link  rel="apple-touch-icon-precomposed" sizes="144x144" href="<r:resource uri="/images/ipad-touch-icon-retina.png"/>" />
        
         <!-- iPad (landscape)SPLASHCREEN -->
        <link rel="apple-touch-startup-image-precomposed" media="(device-width: 768px) and (orientation: landscape)" href="<r:resource uri="/images/ipad_startup_landscape.png"/>"/>
		<link rel="apple-touch-startup-image-precomposed" media="(device-width: 320px)" href="<r:resource uri="/images/apple-touch-startup-image-320x460.png"/>" />  
		
		<!-- iPad (portrait)-->
		<link rel="apple-touch-startup-image-precomposed" media="(device-width: 768px) and (orientation: portrait)" href="<r:resource uri="/images/ipad-startup-image.png"/>"/>
		
		<!-- iPhone (Retina)SPLASHCREEN -->
        <link rel="apple-touch-startup-image-precomposed" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" href="<r:resource uri="/images/apple-touch-startup-image-640x920.png"/>"/>
		<!-- iPad (Retina, portrait) SPLASHCREEN-->
        <link rel="apple-touch-startup-image-precomposed" media="(device-width: 768px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" href="<r:resource uri="/images/ipad-startup-image-retina.png"/>"/>
        <!-- iPad (Retina, landscape) SPLASHCREEN -->
        <link rel="apple-touch-startup-image-precomposed" media="(device-width: 768px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" href="<r:resource uri="/images/ipad_startup_landscape_retina.png"/>"/>
        <!-- iPhone 5 SPLASHCREEN -->
        <link rel="apple-touch-startup-image-precomposed" media="(device-width: 320px)  and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="<r:resource uri="/images/apple-touch-startup-image-640x1096.png"/>"/>

        
		
		<link rel="shortcut icon" href="<r:resource uri="/images/favicon.ico"/>" type="image/x-icon">
		<script type="text/javascript">
		    var _gaq = _gaq || [];
		    _gaq.push(['_setAccount', '${grailsApplication.config.google.analytics.webPropertyID}']);
		    //_gaq.push(['_setDomainName', 'none']);
		    (function() {
		        var ga = document.createElement('script');
		        ga.type = 'text/javascript';
		        ga.async = true;
		        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
		    })();
		</script>
	</head>
	<body dir="${direction}">
		<g:include view="layout-helpers/modals.gsp"/>
		<g:include view="layout-helpers/appcache_init.gsp"/>
		<g:include view="layout-helpers/facebook_init.gsp"/>
		
		<div id="wrap"> <!--  Sticky Footer Container -->
			<g:include view="layout-helpers/header.gsp"/>

			<g:layoutBody/>
			
			<!--  Sticky Footer Filler -->
			<div id="push"></div> 
		</div>
		<g:include view="layout-helpers/footer.gsp"/>
		
		<r:layoutResources/>
	</body>
</html>