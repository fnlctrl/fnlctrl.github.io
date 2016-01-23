import './style.less';
import template from './template.html';

export default {
	template,
	replace: false,
	data: () => ({
		views: [
			"designs",
			"projects",
			"resume"
		]
	})
};