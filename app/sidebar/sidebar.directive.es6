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
		$rootScope.$on('sidebar:hide', ()=> {$element.removeClass('active');});
		this.skills = skills;
		this.contacts = contacts;
		this.toggle = ()=> {$element.toggleClass('active');}
	}

	link(scope, elem, attrs, controller) {
		var styles = controller.skills.reduce((prev, curr)=> {
			return prev + `
				._${curr.style.color}:hover path{
					fill: #${curr.style.color};
				}
				._${curr.style.color} .sidebar-skills-item-background {
					background: #${curr.style.color};
				}
			`
		}, '');
		angular.element(elem).append(angular.element(`<style>${styles}</style>`))
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