import resume from '../../resume.md'
import './resume.css'

import marked from 'marked'

class ResumeController {
	constructor() {
		//var content = marked(resume);
		//var html = angular.element('<div>' + content + '</div>');
		//angular.forEach(html.find('h1'), (value, key)=> {
		//	value.className = 'keepwithnext nowrap';
		//});
		//angular.forEach(html.find('h2'), (value, key)=> {
		//	value.className = 'keepwithnext nowrap';
		//});
		//this.data = html.html();
		this.data = marked(resume);
		setTimeout(()=> {
			var links = document.links;
			for (var i = 0, length = links.length; i < length; i++) {
				if (links[i].hostname != window.location.hostname) {
					links[i].target = '_blank';
				}
			}
		}, 1000)

	}
}

export default
angular
	.module('resume', [])
	.controller('ResumeController', ResumeController)
	.name