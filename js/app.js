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
		.controller('mainCtrl', function ($scope,$http) {
			var self = this;
			$http.get('data/data.json').success(function (data) {
				self.views = data.views;
				self.contacts = data.contacts;
				self.skills = data.skills
			});
		})
		.controller('navCtrl', function ($http, $location) {
			var self = this;
			self.checkActive = function (path) {
				if ($location.path().substr(1, path.length) == path) {
					return 'nav-dot-active'
				} else {
					return ''
				}
			}
		})
		.controller('sidebarCtrl', function ($http) {
			var self = this;
			self.state = '';
			self.toggle = function () {
				if (self.state == '') {
					self.state = 'sidebar-active'
				} else {
					self.state = ''
				}
			};
			$http.get('img/icon-star.svg').success(function(data){
				self.svgText = data.replace('<!DOCTYPE svg>','').replace(/\"/g,"'").replace(/\r?\n|\r/g,'');
				self.getSvgBg = function(color) {
					self.svgText = self.svgText.replace('#FFFFFF',color);
					console.log("data:image/svg+xml;utf8,"+window.btoa(self.svgText));
					return 'url("data:image/svg+xml;utf8,'+self.svgText +'")';
				};
			});

		})
})();