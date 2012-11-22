//Backbone Collection
TestCollection = new function() {
	  var collectionMap = new Object;
	  
	  var Collection = Backbone.Collection.extend({
	          model: TestModel.get(),
	          url: com.compro.cgrails.REQUEST_CONTEXT + "/api/product/"
	  });
	  	  
 	  this.get = function(productId, testId){ // Each backbone collection needs to define "get()" function
 		  
 		  var urlGET = com.compro.cgrails.REQUEST_CONTEXT + "/api/product/";
 		  
 		  if (typeof productId != "undefined") {
 			  urlGET =  urlGET + productId ;
 		  } 	
 		  if (typeof testId != "undefined") {
 			  urlGET =  urlGET + "/test/" + testId ;
 		  } 
 		  
          if (collectionMap[productId] == null) {
        	  collectionMap[productId] = new Collection();
        	  collectionMap[productId].url = urlGET;
          }
		  return collectionMap[productId];
	  };	  
};