<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<g:set var="direction" value="${CgrailsUtils.getOrientation()}" />
<!DOCTYPE html>
<html>
	<head>
		<script src="//connect.facebook.net/en_US/all.js" id="facebook-jssdk"></script>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Pearson HSC</title>

        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
		<meta name="apple-mobile-web-app-capable" content="yes" />
		
		<meta name="description" content="Pearson HSC, 2013">
		<meta name="author" content="Compro Technologies Pvt. Ltd.">

	    <cgrails:stylesheet src="index"/>
	    <r:require modules="application"/>
	    
		<cgrails:environment_setup/>	    
	    <g:layoutHead/>	    
		<r:layoutResources/>
		
		<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		
        
        <link rel="apple-touch-startup-image" media="(device-width: 768px) and (orientation: landscape)" href="<r:resource uri="/images/ipad_startup_landscape.png"/>">
		<link rel="apple-touch-startup-image" media="(device-width: 320px)" href="<r:resource uri="/images/apple-touch-startup-image-320x460.png"/>" >  
		<link rel="apple-touch-icon" href="<r:resource uri="/images/apple-touch-icon.png"/>">
		<link rel="apple-touch-startup-image" media="(device-width: 768px) and (orientation: portrait)" href="<r:resource uri="/images/ipad-startup-image.png"/>">
		
		<link rel="shortcut icon" href="<r:resource uri="/images/favicon.ico"/>" type="image/x-icon">
		<ga:trackPageview />
	</head>
	<body dir="${direction}">
		<g:include view="layout-helpers/modals.gsp"/>
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