<%@ page import="com.compro.cgrails.CgrailsUtils" %>
<%@ page import="com.compro.cgrails.CgrailsConstants" %>
<%@ page import="org.codehaus.groovy.grails.plugins.springsecurity.SpringSecurityUtils" %>

<g:set var="facebookAppId" value="${SpringSecurityUtils.securityConfig.facebook.appId}" />

<g:set var="workflow" value="${CgrailsUtils.getWorkflow()}"/>

<g:if test="${workflow != CgrailsConstants.WORKFLOW_OFFLINE}">
	<div id="fb-root" style="display:none"></div>
	<script>
		<g:if test="${isFacebookLoginSuccess != true}">
		 	window.fbAsyncInit = function() {
				FB.init({
			      appId      : '${facebookAppId}', 
			      status     : true, 
			      cookie     : true, 
			      xfbml      : true,
			      oauth  	 : true
			    });
			    if (document.getElementById("facebook-login")) {
					document.getElementById("facebook-login").style.display = "block";
			    }	
			 }; 
			 
			(function(d, debug){
				var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement('script'); js.id = id; js.async = true;
				js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
				ref.parentNode.insertBefore(js, ref);
			}(document, /*debug*/ false)); 
		</g:if>	
		<g:else>
			FB.init({
		      appId      : '${facebookAppId}', 
		      status     : true, 
		      cookie     : true, 
		      xfbml      : true,
		      oauth  	 : true
		    });			
		</g:else>
	</script>
</g:if>	
