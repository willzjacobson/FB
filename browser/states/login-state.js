app.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: 'login',
		templateUrl: '/templates/login.html',
		controller: 'LoginCtrl'
	});
});

app.controller('LoginCtrl', function($scope, AuthFactory) {

	$scope.sendLoginInfo = AuthFactory.login;

});