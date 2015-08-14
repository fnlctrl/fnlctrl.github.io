import template from './sidebar.html'

const _rootScope = new WeakMap();

class Sidebar {
	constructor($rootScope) {
		this.restrict = 'E';
		this.template = template;
		this.controllerAs = 'sidebar';
		_rootScope.set(this, $rootScope);
	}

	controller() {
		this.state = '';
		_rootScope.get(Sidebar.instance).$on('sidebar:hide', ()=> {this.state = ''});
		_rootScope.get(Sidebar.instance).$on('sidebar:show', ()=> {this.state = 'active'});

		this.toggle = ()=> {
			this.state = (this.state === '') ? 'active' : '';
		}
	}

	static getInstance($rootScope) {
		'ngInject';
		Sidebar.instance = new Sidebar($rootScope);
		return Sidebar.instance;
	}

}

export default
angular
	.module('sidebar', [])
	.directive('sidebar', Sidebar.getInstance)
	.name