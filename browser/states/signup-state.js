app.config(function($stateProvider) {
	$stateProvider.state('signup', {
		url: 'signup',
		templateUrl: '/templates/signup.html',
		controller: 'SignupCtrl'
	});
});

app.controller('SignupCtrl', function($scope, AuthFactory) {

	$scope.sendSignupInfo = AuthFactory.signup;

});