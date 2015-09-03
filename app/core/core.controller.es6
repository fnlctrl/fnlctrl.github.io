class CoreController {
	constructor($rootScope, Document) {
		"ngInject";
		this.$rootScope = $rootScope;
		this.theme = 'theme-mono';
		this.designs = Document.designs;

		var themes = {
			designs: 'mono',
			detail: 'mono',
			projects: 'blue',
			resume: 'cyan'
		};

		$rootScope.$on('$stateChangeStart', (event, toState)=> {
			this.theme = themes[toState.name];
		})
	}

	hideSidebar() {
		this.$rootScope.$emit('sidebar:collapse');
	}
}

export default
angular
	.module('core', [])
	.controller('CoreController', CoreController)
	.name