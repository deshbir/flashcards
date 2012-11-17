<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<g:set var="direction" value="${CgrailsUtils.getOrientation()}" />
<!DOCTYPE html>
<html>
	<head>
		<title>Pearson HSC Flashcards</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Pearson HSC Demo, 2012">
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
		<link rel="shortcut icon" href="@{'/public/images/favicon.ico'}" type="image/x-icon">
	</head>
	<body dir="${direction}">
		<g:include view="layout-helpers/header.gsp"/>
		

		<g:layoutBody/>
	
	
		<g:include view="layout-helpers/footer.gsp"/>
		<r:layoutResources/>	
	</body>
</html>