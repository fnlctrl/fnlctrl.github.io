import './gallery.css'
import template from './gallery.html'

class Gallery {
	constructor() {
		this.restrict = 'E';
		this.template = template;
		this.controllerAs = 'gallery';
		this.scope = {
			data: '='
		}
	}

	controller($scope, $element) {
		'ngInject';
		this.data = $scope.data;
	}

	link(scope, elem, attrs, controller) {

	}

	static getInstance() {
		return new Gallery();
	}
}

export default
angular
	.module('gallery', [])
	.directive('gallery', Gallery.getInstance)
	.name