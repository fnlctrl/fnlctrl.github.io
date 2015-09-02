import resume from '../../documents/resume.md'
import designs from '../../documents/designs.md'

class Document {
	constructor(Markdown) {
		'ngInject';
		this.Markdown = Markdown;
		this.data = {resume, designs};
		this.entryByLink = {};
		this.cache = {};
		this.setupEntry(designs);
	}

	split(docName, tagName) {
		if (!docName) return;
		if (!this.cache[docName + tagName]) {
			this.cache[docName + tagName] = this.Markdown.split(this.data[docName], tagName);
		}
		return this.cache[docName + tagName]
	}

	getEntry(link) {
		if (link.startsWith('/')) {
			link = link.substr(1)
		}
		return this.entryByLink[link];
	}

	setupEntry(doc) {
		var Markdown = this.Markdown;
		var parsed = Markdown.splitByTagName(Markdown.getDom(doc), 'h1');
		parsed.forEach(item => {
			var link = item[0].childNodes[0].attributes[0].value;
			console.log();
			this.entryByLink[link] = item;
		});
	}
}

export default
angular
	.module('document', [])
	.service('Document', Document)
	.name