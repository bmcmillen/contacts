angular.module('contactList').controller('ContactCtrl', function($scope,$uibModal,$uibModalInstance,$http, contactItem) {
	console.log('ContactCtrl contactItem=', contactItem);
	$scope.contact = contactItem;
	if(contactItem.created) contactItem.created = new Date(contactItem.created);
	if(contactItem.updated) contactItem.updated = new Date(contactItem.updated);

	$http.get('/categories').then(function(res) {
		$scope.categories = res.data;
	});

	$scope.save = function() {
		if(contactItem._id) contactItem.updated = new Date();
		$http.post('/contacts', $scope.contact).then(function(response) {
			console.log('post /contacts: ', response.data);
			$uibModalInstance.close();
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss();
	};

	$scope.delete = function() {
		var deleteModalInstance = $uibModal.open({
			templateUrl: 'confirm.html',
			controller: function($scope,$uibModalInstance) {
				$scope.yes = function() {
					$uibModalInstance.close();
				};
				$scope.no = function() {
					$uibModalInstance.dismiss();
				};
			}
		});
		deleteModalInstance.result.then(function() {
			$http.delete('/contacts/' + $scope.contact._id).then(function() {
				$uibModalInstance.close();
			});
		});
	};
});
