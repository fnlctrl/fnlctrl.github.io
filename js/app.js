(function () {
	var app = angular.module('portfolio', ['ngRoute', 'ngAnimate'])
		.config(function ($routeProvider) {
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
		})
		.factory('dataService', function ($q, $http) {
			var storage = {};
			return {
				getItems: function () {
					var storageDefer = $q.defer();
					if (Object.keys(storage).length > 0) {
						storageDefer.resolve(storage);
					}
					else {
						$http.get('data/data.json').success(function (data) {
							storage = data;
							storageDefer.resolve(data)
						});
					}
					return storageDefer.promise;
				}
			}
		})
		.controller('mainCtrl', function () {
			//not currently needed
		})
		.controller('navCtrl', function ($scope, $location, dataService) {
			var self = this;
			dataService.getItems().then(function (data) {
				self.views = data['views'];
			});
			self.checkActive = function (path) {
				if ($location.path().substr(1, path.length) == path) {
					return 'nav-dot-active'
				} else {
					return ''
				}
			}
		})
		.controller('sidebarCtrl', function ($scope, dataService) {
			var self = this;
			var colors = [];
			var shapes = [];
			dataService.getItems().then(function (data) {
				self.contacts = data['contacts'];
				self.skills = data['skills'];
				colors = self.skills.map(function (obj) {
					return obj.style.color
				});
				shapes = self.skills.map(function (obj) {
					return obj.style.shape
				});
			});
			self.getSkillStyle = function () {
				return colors.map(function(color){
					return shapes.map(function(shape){
						return [
							'._',color,':hover .',shape,'{',
								'background: #',color,
							'}'
						].join('');
					}).append(
						[
							'._',color,':hover path {',
							'fill: #',color,
							'}'
						].join('')
					).join('\n')
				});

				//._{{skill.style.color}}:hover path { fill: #{{ skill.style.color }} }
				//._{{skill.style.color}}:hover .{{skill.style.shape}} { background: #{{ skill.style.color }} }
			};
			self.state = '';
			self.toggle = function () {
				if (self.state == '') {
					self.state = 'sidebar-active'
				} else {
					self.state = ''
				}
			};
		})
})();