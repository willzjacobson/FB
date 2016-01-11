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
	});
});

app.controller('ProfileCtrl', function($scope, user, AuthFactory) {

	$scope.me = AuthFactory.getCurrentUser();
	$scope.user = user;
console.log(user);
});