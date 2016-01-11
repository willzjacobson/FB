app.config(function($stateProvider) {
	$stateProvider.state('profile', {
		url: '/profile/:userId',
		templateUrl: '/templates/profile.html',
		controller: 'ProfileCtrl',
		resolve: {
			user: function(UserFactory, $stateParams) {
				return UserFactory.getOneUser($stateParams.userId);
			}
		}
	})
	.state('profile.friends', {
		url: '/friends',
		templateUrl: '/templates/profile.friends.html',
		controller: function($scope) {
			$scope.friends = $scope.user.desiredFriends;
			
			$scope.isFriend = function(userId) {
				return ($scope.me.friends.indexOf(userId) >= 0 ||
				$scope.me.desiredFriends.indexOf(userId) >= 0);
			};
			
		},
		resolve: {}
	})
	.state('profile.hobbies', {
		url: '/hobbies',
		templateUrl: '/templates/profile.hobbies.html',
		controller: function($scope) {
			$scope.hobbies = $scope.user.hobbies;
		}
	});
});

app.controller('ProfileCtrl', function($scope, user, AuthFactory) {

	$scope.me = AuthFactory.getCurrentUser();
	console.log('$scope.me', $scope.me);
	$scope.user = user;

});