UserModel = new function() {

	var modelObj = null;
	
	var Model = Backbone.Model.extend({
					urlRoot: com.compro.cgrails.REQUEST_CONTEXT + "/api/user/"
				});
	
	this.get = function(){
		if (modelObj == null) {
			modelObj = new Model();
		}
		return modelObj;
    };
	
	
};