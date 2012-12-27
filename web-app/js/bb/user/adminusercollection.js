//Backbone Collection
AdminUserCollection = new function() {
	
	var collection = null;
	var Collection = Backbone.Collection.extend({
		model: AdminUserModel.get(),
		initialize: function(){
			this.url= com.compro.cgrails.REQUEST_CONTEXT + "/api/admin/user";
		},
		comparator: function(user) {
			return user.get('id');
		}
	});

	this.get = function(){
		if (this.collection == null) {
			this.collection = new Collection();
		}
		return this.collection;
	};
};