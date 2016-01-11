app.directive('userList', function() {
	return {	
		restrict: 'E',
		templateUrl: '/templates/user-list.html',
		scope: {
			users: '='
		}
	};
});