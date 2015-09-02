import './sidebar.css'
import template from './sidebar.html'
import skills from '../../data/skills.json'
import contacts from '../../data/contacts.json'

class Sidebar {
	constructor() {
		this.restrict = 'E';
		this.template = template;
		this.controllerAs = 'sidebar';
	}

	controller($rootScope, $element) {
		'ngInject';
		$rootScope.$on('sidebar:collapse', ()=> {$element.removeClass('active');});
		$rootScope.$on('ui:toggleVisibility', ()=> {$element.toggleClass('hidden')});

		this.skills = skills;
		this.contacts = contacts;
		this.svgIcons = Object.keys(contacts).reduce((prev, curr)=> {
			prev[curr] = require(`../../img/ic-${curr}.svg`);
			return prev;
		}, {});
		this.toggle = ()=> {$element.toggleClass('active')};
	}

	link(scope, elem, attrs, controller) {
		var styles = Object.keys(controller.skills).reduce((prev, curr)=> {
			var color = controller.skills[curr].style.color;
			return prev + `
				._${color}:hover path{
					fill: #${color};
				}
				._${color} .sidebar-skills-item-background {
					background: #${color};
				}
			`
		}, '');
		elem.append(angular.element(`<style>${styles}</style>`))
	}

	static getInstance() {
		return new Sidebar();
	}
}

export default
angular
	.module('sidebar', [])
	.directive('sidebar', Sidebar.getInstance)
	.name