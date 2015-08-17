class CoreController {
	constructor($rootScope) {
		"ngInject";
		this.$rootScope = $rootScope;
	}

	hideSidebar() {
		this.$rootScope.$emit('sidebar:hide');
	}

	setBackground(color) {
		this.background = color;
	}
}

export default
angular
	.module('core', [])
	.controller('CoreController', CoreController)
	.name