import './style.less';
import template from './template.html';

export default {
	template,
	data: () => ({
		views: [
			"designs",
			"projects",
			"resume"
		]
	})
};