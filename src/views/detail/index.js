import './style.less';
import template from './template.html';

export default {
    template,
    props:{
        data:  {
            type: Object
        }
    },
    route: {
        data: ({to: {params: {name}}}) => ({
            name
        })
    },
    data: () => ({
        name: ''
    }),
    computed: {
        item() {
            return this.data[this.name];
        },
        back() {
            return {
                path: this.$route.path.replace(this.name,''),
                replace: true,
            }
        }
    }
};