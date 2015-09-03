/**
 * libraries
 */

import angular from 'angular'
import ngAnimate from 'angular-animate'
import ngSanitize from 'angular-sanitize'
import uiRouter from 'angular-ui-router'

/**
 * app
 */

import './app.css'
import './themes/themes.css'
import config from './app.config'
import core from './core/core.controller'
import sidebar from './sidebar/sidebar.directive'
import nav from './nav/nav.directive'
import resume from './resume/resume.controller'
import designs from './designs/designs.controller'
import gallery from './gallery/gallery.directive'
import markdown from './markdown/markdown.service'
import document from './document/document.service'
import detail from './detail/detail.controller'
//import column from './column/column.directive'

window.perftest = (name,callback)=>{
	var t1 = +new Date;
	for (var i=0;i<10000;i++) {
		callback();
	}
	var t2 = +new Date;
	console.log(name);
	console.log(t2 - t1);
};

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
		gallery,
		markdown,
		document,
		detail
	])
	.config(config);