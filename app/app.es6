/**
 * libraries
 */

import angular from 'angular'
import ngAnimate from 'angular-animate'
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

angular
	.module('portfolio', [
		uiRouter,
		ngAnimate,
		core,
		sidebar,
		nav,
		resume
	])
	.config(config);