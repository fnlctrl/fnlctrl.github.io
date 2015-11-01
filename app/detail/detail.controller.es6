import './detail.css'

class Detail {
	constructor($location, $scope, $rootScope, Document) {
		'ngInject';
		this.Document = Document;
		this.$location = $location;
		$rootScope.$emit('ui:toggleVisibility');
		$scope.$on('$destroy', () => {$rootScope.$emit('ui:toggleVisibility')});
		this.getContents($location.path());
	}

	getContents(path) {
		this.Document
			.setupEntries(path.split('/')[1])
			.then(() => {
				var data = this.Document.getEntry(path);
				console.log(data);
				var temporaryDom = angular.element('<div>').append(data);
				var images = temporaryDom.find('ul')[0].outerHTML;
				temporaryDom.find('ul').detach();
				var text = temporaryDom.html();
				this.images = images;
				this.text = text;
			})
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