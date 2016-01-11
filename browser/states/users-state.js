app.config(function($stateProvider) {
	$stateProvider.state('users', {
		url: '/users',
		templateUrl: '/templates/users.html',
		controller: 'UsersCtrl',
		resolve: {
			users: function(UserFactory) {
				return UserFactory.getAllUsers();
			}
		}
	});
});

app.controller('UsersCtrl', function($scope, users, AuthFactory, FriendFactory) {

	$scope.me = AuthFactory.getCurrentUser();
	$scope.users = users;

	$scope.isFriend = function(userId) {
		return ($scope.me.friends.indexOf(userId) >= 0 ||
			$scope.me.desiredFriends.indexOf(userId) >= 0);
	};

	$scope.requestFriend = function(myId, otherId) {
		FriendFactory.requestFriend(myId, otherId)
		.then(function(updatedMe) {
			console.log(updatedMe)
			$scope.me = updatedMe;
		});
	};

});