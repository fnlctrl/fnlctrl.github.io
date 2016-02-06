import './style.less';
import template from './template.html';
import MdT from 'md-transform';

export default {
    template,
    replace: false,
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        redirect({target: {href}}) {
            href && this.$route.router.go(href.replace(window.location.origin,''));
        }
    }
};