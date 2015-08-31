/**
 * views
 */

import projectsTpl from './projects/projects'
import designsTpl from './designs/designs'
import resumeTpl from './resume/resume'
import detailsTpl from './details/details'

export default ($stateProvider, $locationProvider, $urlRouterProvider) => {
	'ngInject';
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/designs');
	$stateProvider
		.state('projects', {
			url: '/projects',
			template: projectsTpl
		})
		.state('designs', {
			url: '/designs',
			template: designsTpl,
			controller: 'DesignsController',
			controllerAs: 'designs'
		})
		.state('resume', {
			url: '/resume',
			template: resumeTpl,
			controller: 'ResumeController',
			controllerAs: 'resume'
		})
		.state('details', {
			url: '/{category:designs|resume}/:name',
			template: detailsTpl
		});

}