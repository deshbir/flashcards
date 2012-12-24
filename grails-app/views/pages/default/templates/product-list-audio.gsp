<g:set var="imagePath" value="${grailsApplication.config.hsc.media.assets.basepath}"/>
{{#.}}	

   	<ul class="unstyled playlist">
    		{{#topics}}
         <li>
         	<a href="${grailsApplication.config.hsc.media.assets.basepath}{{audioTrack}}">
         		<i class="icon-play"></i> 
         		<span>{{sequence}}</span>
         		{{name}}
         	</a>
         </li>
         {{/topics}}
     </ul>

{{/.}}

