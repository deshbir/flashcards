<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<%@ page import="com.compro.cgrails.CgrailsConstants" %>
<%@ page import="org.codehaus.groovy.grails.plugins.springsecurity.SpringSecurityUtils" %>

<g:set var="facebookAppId" value="${SpringSecurityUtils.securityConfig.facebook.appId}" />

<g:set var="workflow" value="${CgrailsUtils.getWorkflow()}"/>

<g:if test="${workflow != CgrailsConstants.WORKFLOW_OFFLINE}">
	<div id="fb-root" style="display:none"></div>
	<script>
		FB.init({
	      appId      : '${facebookAppId}', 
	      status     : true, 
	      cookie     : true, 
	      xfbml      : true,
	      oauth  	 : true
	    });
	</script>
</g:if>	
