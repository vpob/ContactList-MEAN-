angular.module('cListApp',[])


.controller('cListCtrl', function($scope, $http) {
 

function refreshContactList(){
	$http.get('/contactlist').success(function(response){
		$scope.contactList = response;
		$scope.contact = '';
	});
};

refreshContactList();

	$scope.addContact = function(){			/*if succes we get a response from serv*/
		$http.post('/contactlist', $scope.contact).success(function(response){
				refreshContactList();
		});
	};

	$scope.remContact = function(id){
		$http.delete('/contactlist/' + id).success(function(response){
			refreshContactList();
		});
	};

	$scope.editContact = function(id){
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		});
	};

	$scope.updContact = function(){
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refreshContactList();
		});
	};

	$scope.deSelect = function(){
		$scope.contact = '';
	};

});

