import './detail.css'

class Detail {
	constructor($location, $scope, $rootScope, Document) {
		'ngInject';
		this.Document = Document;
		this.$location = $location;
		$rootScope.$emit('ui:toggleVisibility');
		$scope.$on('$destroy', () => {$rootScope.$emit('ui:toggleVisibility')});

		[this.images,this.text] = this.getContent($location.path());
	}

	getContent(path) {
		var data = this.Document.getEntry(path);
		var temporaryDom = angular.element('<div>').append(data);
		var images = temporaryDom.find('ul')[0].outerHTML;
		temporaryDom.find('ul').detach();
		var text = temporaryDom.html();
		return [images, text]
	}

	close() {
		var path = this.$location.path();
		this.$location.path(path.split('/')[1]);
	}
}

export default
angular
	.module('detail', [])
	.controller('DetailController', Detail)
	.name