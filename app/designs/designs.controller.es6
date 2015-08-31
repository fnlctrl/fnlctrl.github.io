class DesignsController {
	constructor() {
		this.data = [1,2,3];
	}
}

export default
angular
	.module('designs', [])
	.controller('DesignsController', DesignsController)
	.name