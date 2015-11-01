class Document {
	constructor(Markdown, $http, $q) {
		'ngInject';
		this.Markdown = Markdown;
		this.$http = $http;
		this.$q = $q;
		this.entryByLink = {};
		this.cache = {};
		this.processed = {};
	}

	getDocument(docName) {
		return this.$http.get(`documents/${docName}.md`, {cache: true})
	}

	getEntry(link) {
		if (link.startsWith('/')) {
			link = link.substr(1)
		}
		return this.entryByLink[link];
	}

	setupEntries(docName) {
		if (this.processed[docName]) {
			return this.$q.when();
		} else {
			return this.getDocument(docName).then(result => {
				var Markdown = this.Markdown;
				Markdown
					.splitByTagName(Markdown.getDom(result.data), 'h4')
					.forEach(item => {
						var temp = angular.element('<div>').append(angular.element(item));
						var link = temp.find('h1').find('a')[0].attributes[0].value;
						this.entryByLink[link] = item;
					});
				this.processed[docName] = true;
			})
		}
	}
}

export default
angular
	.module('document', [])
	.service('Document', Document)
	.name