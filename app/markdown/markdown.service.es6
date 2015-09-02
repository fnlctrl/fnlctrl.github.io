import marked from 'marked'

class Markdown {
	constructor() {
		this.cache = {};
	}

	wrap(md, splitTags, wrapTag) {
		if (typeof md === 'string') {
			md = this.getDom(md)
		}
		var split = this.splitByTagNames(md, splitTags);
		if (splitTags.length > 1) {
			return split.reduce((prev, curr) => prev + this._wrap(curr, wrapTag), '');
		} else {
			return split.reduce((prev, curr) => prev + `<${wrapTag}>${this._toHtml(curr)}</${wrapTag}>`, '')
		}
	}

	split(md, splitTag) {
		if (typeof md === 'string') {
			md = this.getDom(md)
		}
		return this.splitByTagName(md, splitTag)
			.map((item)=> this._toHtml(item));
	}

	parse(md) {
		if (!this.cache[md.substr(0, 255)]) {
			this.cache[md.substr(0, 255)] = marked(md);
		}
		return this.cache[md.substr(0, 255)];
	}

	getDom(md) {
		return angular.element(this.parse(md));
	}

	/**
	 * @param {Array|Object} dom
	 * Collection of dom elements
	 *
	 * @param {Array} tagNames
	 * tag names to split by
	 *
	 * @returns {Array}
	 */

	splitByTagNames(dom, tagNames) {
		var tagName = tagNames[0];
		if (tagName === undefined || tagNames.length === 0) {
			// base case
			return dom;
		} else {
			// recursive case
			return this.splitByTagName(dom, tagName)
				.map(item => this.splitByTagNames(item, tagNames.slice(1)));
		}

	}

	/**
	 * Given tagName = 'h1' and dom = [<h1>,<h2>,<p>,...<h1>,<a>,...<h1>,<blockquote>...]
	 * Returns [[<h1>,<h2>,...][<h1>,<a>,...][<h1>,<blockquote>,...]]
	 *
	 * @param {Array|Object} dom
	 * Collection of dom elements
	 *
	 * @param {String} tagName
	 *
	 * @returns {Array}
	 */

	splitByTagName(dom, tagName) {
		dom = this._toArray(dom);
		tagName = tagName.toUpperCase();
		return dom.reduce((prev, curr) => {
			if (curr.tagName === tagName) {
				prev.push([curr]);
			} else {
				var last = prev[prev.length - 1];
				if (last instanceof Array) {
					last.push(curr);
				} else {
					prev.push(curr);
				}
			}
			return prev
		}, []);
	}

	/**
	 * Given [h1,[h2,a,p,...]]
	 * Returns <h1><tagName><h2><a><p></tagName>
	 *
	 * @param arrayOfElements
	 * Multi-Dimensional Array of DOM Elements
	 *
	 * @param {String} wrapTag
	 *
	 * @returns {String}
	 * Dom string
	 */

	_wrap(arrayOfElements, wrapTag) {
		return arrayOfElements.reduce((prev, curr)=> {
			if (curr instanceof Array) {
				return prev + `<${wrapTag}>${this._toHtml(curr)}</${wrapTag}>`
			} else {
				return prev + this._toHtml(curr);
			}
		}, '')
	}

	_toHtml(elem) {
		// single dom element
		if (elem instanceof Element) {
			return elem.outerHTML || elem.textContent;
		}
		// collection of dom elements
		else {
			elem = this._toArray(elem);
			return elem.reduce((prev, curr) => prev + this._toHtml(curr), '');
		}
	}

	_toArray(domCollection) {
		return Array.prototype.slice.call(domCollection)
	}
}

export default
angular
	.module('markdown', [])
	.service('Markdown', Markdown)
	.name