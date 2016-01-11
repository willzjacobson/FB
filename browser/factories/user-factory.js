app.factory('UserFactory', function($http) {

	var userCache;
	var toReturn = {};

	function toData(res) {
		return res.data;
	}

	toReturn.getAllUsers = function() {
		return $http.get('/api/users')
		.then(function(res) {
			userCache = res.data;
			return userCache;
		});
	};

	toReturn.getOneUser = function(id) {
		return $http.get('/api/users/' + id)
		.then(toData);
	};

	toReturn.editUser = function(userId, newInfo) {
		return $http.put('/api/users/' + userId, newInfo)
		.then(function(res) {
			for (var i = 0; i < userCache.length; i++) {
				if (userCache[i]._id === postId) {
					userCache[i] = res.data;
					return res.data;
				}
			}
		});
	};

	toReturn.deleteUser = function(userId) {
		return $http.delete('/api/users/' + userId)
		.then(function(res) {
			var index;
			for (var i = 0; i < userCache.length; i++) {
				if (userCache[i]._id === postId) {
					index = i;
					break;
				} 
			}
			userCache.splice(index, 1);
		});
	};

	toReturn.fetchUserCache = function() {
		return userCache;
	};

	return toReturn;

});