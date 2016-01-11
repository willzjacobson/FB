app.factory('FriendFactory', function($http) {

	var friendCache;
	var toReturn = {};

	toReturn.getfriendsForUser = function(userId) {
		return $http.get('/api/users/' + userId + '/friends')
		.then(function(res) {
			friendCache = res.data;
			return friendCache;
		});
	};

	toReturn.requestFriend = function(userId, friendId) {
		$http.put('/api/users/' + userId + '/request/' + friendId);
	};

	toReturn.confirmFriend = function(userId, friendId) {
		$http.put('/api/users/' + userId + '/confirm/' + friendId)
		.then(function(updatedUser) {
			this.getfriendsForUser(updatedUser._id);
		});
	};

	toReturn.unfriend = function(userId, friendId) {
		$http.put('/api/users/' + userId + '/unfriend/' + friendId)
		.then(function(updatedUser) {
			var index;
			for (var i = 0; i < friendCache.length; i++) {
				if (friendCache[i]._id === friendId) {
					index = i;
					break;
				} 
			}
			friendCache.splice(index, 1);
		});
	};

	toReturn.fetchFriendCache = function() {
		return friendCache;
	};

	return toReturn;

});