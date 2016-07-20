angular.module('contactList').controller('ContactListCtrl', function($scope,$http,$uibModal) {
	function getContacts() {
		$http.get('/contacts').then(function(response) {
			$scope.contacts = response.data;
		});
	}
	getContacts();

	$scope.sortProp = 'firstName';
	$scope.sortReverse = false;
	$scope.setSort = function(prop) {
		if($scope.sortProp===prop) $scope.sortReverse = !$scope.sortReverse;
		$scope.sortProp = prop;
		console.log('setSort: %o %o', $scope.sortProp, $scope.sortReverse);
	};
	$scope.sortIcon = function(prop) {
		if($scope.sortProp!==prop) return null;
		return ['glyphicon', $scope.sortReverse ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down'];
	}

	$scope.loadContact = function(contact) {
		if(!contact) contact={created: new Date()};
		var modalInstance = $uibModal.open({
			templateUrl: 'contact.html',
			controller: 'ContactCtrl',
			resolve: {
				contactItem: function() {return contact;}
			}
		});
		modalInstance.result.then(function() {
			getContacts();
		});
	};
});
