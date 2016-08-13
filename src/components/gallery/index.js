import './style.less';
import template from './template.html';
import MdT from 'md-transform';

export default {
    template,
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        redirect({target: {href}}) {
            href && this.$router.push(href.replace(window.location.origin,''));
        }
    }
};