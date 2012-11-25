<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<%@ page import="com.compro.cgrails.CgrailsConstants" %>

<g:set var="workflow" value="${CgrailsUtils.getWorkflow()}"/>

<g:if test="${workflow != CgrailsConstants.WORKFLOW_OFFLINE}">
	<facebookAuth:init/>						
</g:if>	
