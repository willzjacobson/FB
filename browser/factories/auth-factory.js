app.factory('AuthFactory', function($http, $state) {

	var currentUser;
	var toReturn = {};

	toReturn.login = function(userData) {
		$http.post('/auth/login', userData)
		.then(function(res) {
			currentUser = res.data;
			$state.go('profile', {userId: currentUser._id});
		});
	};

	toReturn.signup = function(userData) {
		userData.hobbies.split(',');
		$http.post('/auth/signup', userData)
		.then(function(res) {
			currentUser = res.data;
			$state.go('profile', {userId: currentUser._id});
		});
	};

	toReturn.refreshCurrentUser = function() {
		return $http.get('/auth/me')
		.then(function(res) {
			currentUser = res.data;
			return currentUser;
		});
	};

	toReturn.getCurrentUser = function() {
		return currentUser;
	};

	toReturn.logout = function() {
		$http.get('/auth/logout')
		.then(function() {
			currentUser = null;
			$state.go('home');
		});
	};

	return toReturn;

});