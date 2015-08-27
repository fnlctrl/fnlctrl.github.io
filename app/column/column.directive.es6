import './column.css'
import FTColumnflow from 'FTColumnflow'

class Column {
	constructor() {
		this.restrict = 'E';
		this.controllerAs = 'column';
		this.scope = {
			'content': '='
		}
	}

	link(scope, elem, attrs) {
		var target = angular.element('<div class="columns">')[0];
		var viewport = elem[0];
		elem.append(target);
		var cf = new FTColumnflow(target, viewport, {
			columnCount: attrs.columnCount,
			columnGap: attrs.columnGap || 0,
			viewportWidth: attrs.viewportWidth,
			pagePadding: attrs.pagePadding,
			lineHeight: attrs.lineHeight,
			noWrapOnTags: ['blockquote']
			//showGrid: true
		});
		cf.flow(scope.content);
	}

	static getInstance() {
		return new Column();
	}
}

export default
angular
	.module('column', [])
	.directive('column', Column.getInstance)
	.name