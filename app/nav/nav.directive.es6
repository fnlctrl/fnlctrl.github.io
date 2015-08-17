import './nav.css'
import template from './nav.html'

class Nav {
	constructor() {
		this.restrict = 'E';
		this.template = template;
		this.controllerAs = 'nav';
	}

	controller($location) {
		'ngInject';

		this.views = [
			{name: 'designs', color: '#0094C7'},
			{name: 'projects', color: '#00C267'},
			{name: 'resume', color: '#00C4B9'}
		];

		this.checkActive = (path)=> {
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