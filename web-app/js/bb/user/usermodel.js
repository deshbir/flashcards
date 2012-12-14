UserModel = new function() {

	var modelObj = null;
	
	var Model = Backbone.Model.extend({					
					urlRoot: com.compro.cgrails.REQUEST_CONTEXT + "/api/user/"
				});
	
	this.get = function() {
		if (modelObj == null) {
			modelObj = new Model();
		}		
		
		if (typeof modelObj.id === 'undefined' || modelObj.id == null || modelObj.id == "") {
			modelObj.id = new Date().getTime();
		}
		
		return modelObj;
    },
    
    this.destroy = function(){
    	modelObj.id = null;
    }
	
	
};