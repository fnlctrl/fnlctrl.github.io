export default {
    name: 'detail-view',
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