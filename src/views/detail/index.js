import './style.less';
import template from './template.html';

export default {
    name: 'detail-view',
    template,
    props:{
        data:  {
            type: Object
        }
    },
    data: () => ({
        name: ''
    }),
    fetchRouteData({params: {name}}) {
        this.name = name;
    },
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