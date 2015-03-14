(function () {
	function uniqueArray(arr) {
		ret = [];
		arr.forEach(function (item, index) {
			if (ret.indexOf(item) === -1) {
				ret.push(item)
			}
		});
		return ret;
	}

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
				colors = uniqueArray(
					self.skills.map(function (obj) {
						return obj.style.color
					})
				);
				shapes = uniqueArray(
					self.skills.map(function (obj) {
						return obj.style.shape
					})
				);
			}).then(function () {
				self.getSkillStyle = function () {
					return colors.map(function (color) {
						var arr = shapes.map(function (shape) {
							return [
								'._', color, ':hover .', shape, '{ ',
								'background: #', color,
								' }'
							].join('');
						});
						arr.push(
							[
								'._', color, ':hover path { ',
								'fill: #', color,
								' }'
							].join('')
						);
						return arr.join('\n')
					}).join('\n');
				};
			});
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