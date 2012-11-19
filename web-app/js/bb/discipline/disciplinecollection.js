//Backbone Collection
DisciplineCollection = new function() {
	  var collectionMap = new Object;
	  
	  var Collection = Backbone.Collection.extend({
	          model: DisciplineModel.get(),
	          url: com.compro.cgrails.REQUEST_CONTEXT + "/api/discipline/"
	  });
	  	  
 	  this.get = function(displineId){ // Each backbone collection needs to define "get()" function
 		  
 		  var urlGET = com.compro.cgrails.REQUEST_CONTEXT + "/api/discipline/";
 		  if (typeof displineId != "undefined") {
 			  urlGET =  urlGET + displineId ;
 		  } 	  
 		  
          if (collectionMap[displineId] == null) {
        	  collectionMap[displineId] = new Collection();
        	  collectionMap[displineId].url = urlGET;
          }
		  return collectionMap[displineId];
	  };	  
};