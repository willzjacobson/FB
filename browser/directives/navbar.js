app.directive('navbar', function(AuthFactory, $state) {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: '/templates/navbar.html',
		link: function(scope, elem, attr) {

			scope.getCurrentUser = AuthFactory.getCurrentUser;

			scope.isLoggedIn = function() {
				return AuthFactory.getCurrentUser() !== null;
			};

			scope.logout = AuthFactory.logout;
		}
	};

});