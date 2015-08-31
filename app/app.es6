/**
 * libraries
 */

import angular from 'angular'
import ngAnimate from 'angular-animate'
import ngSanitize from 'angular-sanitize'
import uiRouter from 'angular-ui-router'
import '../css/fonts.css'

/**
 * app
 */

import '../css/style.css'
import config from './app.config'
import core from './core/core.controller'
import sidebar from './sidebar/sidebar.directive'
import nav from './nav/nav.directive'
import resume from './resume/resume.controller'
import designs from './designs/designs.controller'
import gallery from './gallery/gallery.directive'
//import column from './column/column.directive'

angular
	.module('portfolio', [
		uiRouter,
		ngAnimate,
		ngSanitize,
		core,
		sidebar,
		nav,
		resume,
		designs,
		gallery
		//column
	])
	.config(config);