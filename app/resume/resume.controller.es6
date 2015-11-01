import './resume.css'

class ResumeController {
	constructor(Markdown, Document) {
		'ngInject';
		var resumeContainer = document.getElementsByClassName('resume-container')[0];
		// force <a> tags to open in new tab
		var observer = new MutationObserver(() => {
			Array.prototype.forEach.call(document.links, item => {
				if (item.hostname != window.location.hostname) {
					item.target = '_blank'
				}
			});
		});
		observer.observe(resumeContainer, {childList: true});
		setTimeout(() => {observer.disconnect()}, 1000);

		Document.getDocument('resume').then((result)=>{
			this.data = Markdown.wrap(result.data, ['h1', 'h2'], 'blockquote');
		});
	}
}

export default
angular
	.module('resume', [])
	.controller('ResumeController', ResumeController)
	.name