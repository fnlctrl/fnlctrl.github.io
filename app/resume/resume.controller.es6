import resume from '../../resume.md'
import './resume.css'

import marked from 'marked'

class ResumeController {
	constructor() {
		var content = marked(resume);
		var temporaryDom = angular.element(content);
		var elementToHtml = (element) => element.outerHTML || element.textContent;
		var arrayToHtml = (arrayOfElements) => arrayOfElements.reduce((prev, curr) => prev + elementToHtml(curr), '');

		this.data = splitByTagNames(temporaryDom, ['h1', 'h2'])
			.reduce((prev, curr)=>prev + wrap(curr, 'blockquote'), '');

		/**
		 * Given [h1,[h2,a,p,...]]
		 * Returns <h1><tagName><h2><a><p></tagName>
		 *
		 * @param arrayOfElements
		 * Multi-Dimensional Array of DOM Elements
		 *
		 * @param {String} tagName
		 *
		 * @returns {String}
		 * Dom string
		 */

		function wrap(arrayOfElements, tagName) {
			return arrayOfElements.reduce((prev, curr, index)=> {
				if (curr instanceof Array) {
					return prev + `<${tagName}>${arrayToHtml(curr)}</${tagName}>`
				} else {
					return prev + elementToHtml(curr);
				}
			}, '')
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

		function splitByTagNames(dom, tagNames) {
			var tagName = tagNames[0];
			if (tagName === undefined || tagNames.length === 0) {
				// base case
				return dom;
			} else {
				// recursive case
				tagNames = tagNames.slice(1);
				return splitByTagName(dom, tagName).map(
					(item)=> splitByTagNames(item, tagNames)
				);
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
		 * @returns {Array} new array
		 */

		function splitByTagName(dom, tagName) {
			tagName = tagName.toUpperCase();
			return Array.prototype.reduce.call(dom, (prev, curr) => {
				// prev is at first the empty array passed in
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