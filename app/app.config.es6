/**
 * views
 */

import projects from './projects/projects'
import designs from './designs/designs'
import resume from './resume/resume'

const VIEWS = {
	projects,
	designs,
	resume
};

export default ($stateProvider, $locationProvider, $urlRouterProvider) => {
	'ngInject';
	$locationProvider.html5Mode(true);
	$stateProvider.state("otherwise", {
		url: "*path",
		template: VIEWS.designs
	});
	$stateProvider
		.state('views', {
			url: '/:viewName',
			template: (url)=> {
				console.log(url);
				return VIEWS[url.viewName]
			}
		});

}