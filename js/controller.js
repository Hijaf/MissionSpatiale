function objCtrl($scope){
	$scope.mission = 'CubeSat';
}

function MatListCtrl($scope, $routeParams, $http) {
	var $paramMission;
	$http.get('js/contraintes.json').success(function(data) {
		$paramMission = $routeParams.typeM;
		$scope.budget = recupBudget($paramMission, data.budget);
	});
	$http.get('js/mat.json').success(function(data) {
		$scope.lanceurs = data.lanceurs;
		$scope.segments = data.segments;
		$scope.selectedList =   $scope.lanceurs;
	});
	
	$scope.selectList = function(list){
		$scope.selectedList  = $scope[list];
	}

	$scope.afficherMenu = function(){
		afficherMenu();
	}

}