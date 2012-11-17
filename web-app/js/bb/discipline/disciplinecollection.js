//Backbone Collection
DisciplineCollection = new function() {
	  var collection = null;
	  
	  var Collection = Backbone.Collection.extend({
	          model: DisciplineModel.get(),
	          url: com.compro.cgrails.REQUEST_CONTEXT + "/api/discipline/"
	  });
	  
 	  this.get = function(){ // Each backbone collection needs to define "get()" function
          if (collection == null) {
        	  collection = new Collection();
          }
		  return collection;
	  };
};