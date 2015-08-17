import data from '../../data/resume.json'
import './resume.css'

class ResumeController {
	constructor() {
		this.data = data
	}
}

export default
angular
	.module('resume', [])
	.controller('ResumeController', ResumeController)
	.name