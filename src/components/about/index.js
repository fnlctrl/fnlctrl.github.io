import './style.less';
import template from './template.html';
import skills from './skills.js';
import contacts from './contacts.js';
import icon from 'icon';

export default {
    template,
    replace: false,
    data: () => ({
        contacts,
        skills,
        active: false,
        icon,
        styles: Object.keys(skills).reduce((prev, curr) => {
            var color = skills[curr].style.color;
            return prev + `
				._${color}:hover path{
					fill: #${color};
				}
				._${color} .background {
					background: #${color};
				}
			`
        }, '')
    }),
    watch: {
        active(val) {
            if (val) {
                this.$el.className += ' active';
            } else {
                this.$el.className = this.$el.className.replace(' active', '')
            }
        }
    },
    ready() {
    }
};