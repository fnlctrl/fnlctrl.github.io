(function () {
	var app = angular.module('portfolio', ['ngRoute', 'ngAnimate'])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/:view', {
					templateUrl: function (urlVar) {
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
		.controller('navCtrl', function ($http, $location) {
			var self = this;
			$http.get('data/data.json').success(function (data) {
				self.views = data.views;
			});
			self.checkActive = function (path) {
				if ($location.path().substr(1, path.length) == path) {
					return 'nav-dot-active'
				} else {
					return ''
				}
			}
		})
		.controller('sidebarCtrl', function () {
			var self = this;
			self.state = ''
			self.toggle = function () {
				if (self.state == '') {
					self.state = 'sidebar-active'
				} else {
					self.state = ''
				}
			}
		})
})();