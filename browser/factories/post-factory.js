app.factory('PostFactory', function($http) {

	var postCache;
	var toReturn = {};

	toReturn.getPostsForUser = function(userId) {
		return $http.get('/api/posts/' + userId)
		.then(function(res) {
			postCache = res.data;
			return postCache;
		});
	};

	toReturn.createPost = function(fromId, toId, text) {
		return $http.post('/api/posts/' + fromId + '/to/' + toId, {text: text})
		.then(function(res) {
			postCache.push(res.data);
			return res.data;
		});
	};

	toReturn.editPost = function(postId, newText) {
		return $http.put('/api/posts/' + postId, {text: newText})
		.then(function(res) {
			for (var i = 0; i < postCache.length; i++) {
				if (postCache[i]._id === postId) {
					postCache[i] = res.data;
					return res.data;
				}
			}
		});
	};

	toReturn.deletePost = function(postId) {
		return $http.delete('/api/posts/' + postId)
		.then(function(res) {
			var index;
			for (var i = 0; i < postCache.length; i++) {
				if (postCache[i]._id === postId) {
					index = i;
					break;
				} 
			}
			postCache.splice(index, 1);
		});
	};

	toReturn.fetchPostCache = function() {
		return postCache;
	};

	return toReturn;

});