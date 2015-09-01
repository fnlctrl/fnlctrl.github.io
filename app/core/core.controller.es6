class CoreController {
	constructor($rootScope) {
		"ngInject";
		this.$rootScope = $rootScope;
		this.theme = 'theme-mono';

		var themes = {
			'designs': 'blue',
			'projects': 'green',
			'resume': 'cyan'
		};

		$rootScope.$on('$stateChangeStart', (event, toState)=> {
			this.theme = themes[toState.name];
		})
	}

	hideSidebar() {
		this.$rootScope.$emit('sidebar:hide');
	}
}

export default
angular
	.module('core', [])
	.controller('CoreController', CoreController)
	.name