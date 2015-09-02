/**
 * views
 */

import projectsTpl from './projects/projects.html'
import designsTpl from './designs/designs.html'
import resumeTpl from './resume/resume.html'
import detailTpl from './detail/detail.html'

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
		.state('detail', {
			url: '/{category:designs|resume}/:name',
			template: detailTpl,
			controller: 'DetailController',
			controllerAs: 'detail'
		});
}