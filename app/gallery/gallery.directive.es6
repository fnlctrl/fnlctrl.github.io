import './gallery.css'
import template from './gallery.html'

class Gallery {
	constructor() {
		this.restrict = 'E';
		this.template = template;
		this.controllerAs = 'gallery';
	}

	controller($element, Document, Markdown) {
		'ngInject';
		if ($element.attr('doc-name')) {
			Document.getDocument($element.attr('doc-name')).then(result => {
				this.data = Markdown.split(result.data, 'h4');
			});
		}
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