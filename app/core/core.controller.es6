const _rootScope = new WeakMap();

class CoreController {
	constructor($rootScope) {
		"ngInject";
		_rootScope.set(this, $rootScope);
	}

	hideSidebar() {
		_rootScope.$emit('sidebar:hide');
	}
}

export default
angular
	.module('core', [])
	.controller('CoreController', CoreController)
	.name