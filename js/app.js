angular.module('route', []).config(function($compileProvider){

    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
}).config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {templateUrl: 'vues/accueil.html'}).
			when('/regles', {templateUrl: 'vues/regles.html'}).
			when('/credits', {templateUrl: 'vues/credits.html'}).
			when('/objectifs', {templateUrl: 'vues/objectifs.html', controller: objCtrl}).
			when('/jouer/:typeM', {templateUrl: 'vues/jouer.html', controller: MatListCtrl}).
			otherwise({redirectTo: '/'});
	}]);