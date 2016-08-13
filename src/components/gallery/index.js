import MdT from 'md-transform';

export default {
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