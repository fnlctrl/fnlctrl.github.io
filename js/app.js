(function () {
	var app = angular.module('portfolio', ['ngRoute','ngAnimate'])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/:view', {
					templateUrl: function(urlVar) {
						return 'html/' + urlVar.view + '.html'
					},
					controller: 'mainCtrl'
				})
				.otherwise({
					redirectTo: '/designs'
				});
		}])
		.controller('mainCtrl', function ($scope) {

		})
		.controller('navCtrl', function ($scope, $http, $location) {
			$http.get('data/data.json').success(function (data) {
				$scope.views = data.views;
			});
			$scope.checkActive = function(path) {
				if ($location.path().substr(1,path.length) == path) {
					return 'nav-dot-active'
				} else {
					return ''
				}
			}
		})
})();