window.app = angular.module('FBClone', ['ui.router', 'ui.bootstrap']);

app.config(function($urlRouterProvider, $locationProvider) {
	// $locationProvider.html5Mode(true); // no #
	// $urlRouterProvider.otherwise('/home'); // goes home if specified location doesn't exist
});

app.run(function($state, AuthFactory) {

	AuthFactory.refreshCurrentUser()
	.then(function(loggedInUser) {
		if(!loggedInUser) $state.go('home');
	});

});