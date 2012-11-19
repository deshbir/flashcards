//Backbone Collection
ProductCollection = new function() {
	  var collectionMap = new Object;
	  
	  var Collection = Backbone.Collection.extend({
	          model: ProductModel.get(),
	          url: com.compro.cgrails.REQUEST_CONTEXT + "/api/discipline/"
	  });
	  	  
 	  this.get = function(displineId, productid){ // Each backbone collection needs to define "get()" function
 		  
 		  var urlGET = com.compro.cgrails.REQUEST_CONTEXT + "/api/discipline/";
 		  
 		  if (typeof displineId != "undefined") {
 			  urlGET =  urlGET + displineId ;
 		  } 	
 		  if (typeof productid != "undefined") {
 			  urlGET =  urlGET + "/product/" + productid ;
 		  } 
 		  
          if (collectionMap[productid] == null) {
        	  collectionMap[productid] = new Collection();
        	  collectionMap[productid].url = urlGET;
          }
		  return collectionMap[productid];
	  };	  
};