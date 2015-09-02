import './gallery.css'
import template from './gallery.html'

class Gallery {
	constructor() {
		this.restrict = 'E';
		this.template = template;
		this.controllerAs = 'gallery';
	}

	controller($element, Document) {
		'ngInject';
		this.data = Document.split($element.attr('doc-name'), 'h1');
	}

	static getInstance() {
		return new Gallery();
	}
}

export default
angular
	.module('gallery', [])
	.directive('gallery', Gallery.getInstance)
	.name