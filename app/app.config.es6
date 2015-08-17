/**
 * views
 */

import projectsTpl from './projects/projects'
import designsTpl from './designs/designs'
import resumeTpl from './resume/resume'

export default ($stateProvider, $locationProvider,$urlRouterProvider) => {
	'ngInject';
	$locationProvider.html5Mode(true);
	$stateProvider
		.state('projects', {
			url: '/projects',
			template: projectsTpl
		})
		.state('designs',{
			url: '/designs',
			template: designsTpl
		})
		.state('resume',{
			url: '/resume',
			template: resumeTpl,
			controller: 'ResumeController',
			controllerAs: 'resume'
		});
	$urlRouterProvider.otherwise('/designs');
}