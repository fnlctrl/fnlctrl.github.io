/**
 * libraries
 */

import angular from 'angular'
import ngAnimate from 'angular-animate'
import uiRouter from 'angular-ui-router'

/**
 * app
 */

import '../css/style.css'
import config from './app.config'
import core from './core/core.controller'
import sidebar from './sidebar/sidebar.directive'

angular
	.module('portfolio', [
		uiRouter,
		ngAnimate,
		core,
		sidebar
	])
	.config(config);