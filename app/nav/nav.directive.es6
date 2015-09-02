import './nav.css'
import template from './nav.html'

class Nav {
	constructor() {
		this.restrict = 'E';
		this.template = template;
		this.controllerAs = 'nav';
	}

	controller($location, $rootScope, $element) {
		'ngInject';
		$rootScope.$on('ui:toggleVisibility', ()=> {$element.toggleClass('hidden')});

		this.views = ['designs', 'projects', 'resume'];
		this.checkActive = path => {
			if ($location.path().substr(1, path.length) === path) {
				return 'active'
			} else {
				return ''
			}
		}
	}

	static getInstance() {
		return new Nav();
	}
}

export default
angular
	.module('nav', [])
	.directive('nav', Nav.getInstance)
	.name