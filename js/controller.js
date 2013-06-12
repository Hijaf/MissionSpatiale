function objCtrl($scope){
	$scope.mission = 'CubeSat';
}

function MatListCtrl($scope, $routeParams, $http) {
	var $paramMission,
		$listeChoix,
		$achatId,
		$achatType,
		$tabPanier=[]
		$tabMatAchete=[];

	$paramMission = $routeParams.typeM;
	$http.get('js/contraintes.json').success(function(data) {
		$scope.budget = recupBudget($paramMission, data.budget);
		$scope.newBudget = $scope.budget;
	});
	$http.get('js/mat.json').success(function(data) {
		$scope.lanceurs = data.lanceurs;
		$scope.projets = data.projets;
		$scope.structures = data.structures;
		$scope.segments = data.segments;
		$scope.energies = data.energies;
		$scope.typeM = recupTypeM($paramMission);
		$listeChoix = 'lanceurs';
		$scope.charge = 'N/A';
		$scope.elec = 'N/A';
		$scope.newCharge = 0;
		$scope.newElec = 0;
		$scope.selectedList =   $scope[$listeChoix];
	});
	
	$scope.selectionnerListe = function($list){
		$listeChoix = $list;
		$scope.selectedList  = $scope[$listeChoix];
	}

	$scope.afficherMenu = function(){
		afficherMenu();
	}

	$scope.acheterMat = function($achatId, $achatType){
		//cache le matériel acheté
		this.element.state = true;
		$tabMatAchete.push(this.element);
		// Boucle pour récup le matériel acheté et l'ajouter au panier
		for(var $i=0;$i<$scope[$listeChoix].length;$i++){
			if($achatId == $scope[$listeChoix][$i].id){
				if($achatType === "lanceurs"){
					$scope.charge = $scope[$listeChoix][$i].carac.charge[$scope.typeM];
				}
				if($achatType === "energies"){
					$scope.elec = $scope[$listeChoix][$i].carac.pelec[$scope.typeM];
				}
				// mise a jour des indicateurs en fonction du matériel acheté
				$scope.newBudget = majBudget($scope[$listeChoix][$i],$scope.newBudget, 1);
				$scope.newElec = majElec($scope[$listeChoix][$i],$scope.newElec,1);
				$scope.newCharge = majCharge($scope[$listeChoix][$i],$scope.newCharge,1);
				// met le matériel dans le panier
				$tabPanier.push($scope[$listeChoix][$i]);
				$scope.panier = $tabPanier;
				$scope.test = true;
			}
		}
	}

	$scope.vendreMat = function($achatId,$achatType){
		var $index;
		for (var $i=0;$i<$tabPanier.length;$i++){
			if($achatId == $tabPanier[$i].id)
			{
				$index=$i;
				if($achatType === "lanceurs"){
					$scope.charge = "N/A";
				}
				if($achatType === "energies"){
					$scope.elec = "N/A";
				}
			}
		}
		// reaffiche le matériel dans la liste
		$tabMatAchete[$index].state = false;
		$tabMatAchete.splice($index,1);
		// remet a jour les indicateurs en fonction du matériel vendu
		$scope.newBudget = majBudget($tabPanier[$index],$scope.newBudget, 2);
		$scope.newElec = majElec($tabPanier[$index],$scope.newElec,2);
		$scope.newCharge = majCharge($tabPanier[$index],$scope.newCharge,2);
		//supprime le matériel du panier
		$tabPanier.splice($index,1);
		$scope.panier = $tabPanier;
	}
}