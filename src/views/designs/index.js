import './style.less';
import template from './template.html';
import MdT from 'md-transform';

import gallery from 'gallery';

import designs from '../../../documents/designs.md';
var tokens = MdT.getTokens(designs);

export default {
    template,
    components: {gallery},
    data: () => ({
        gallery: MdT.splitByHeading(tokens, 1).reduce((newObj, item) => {
            var link = item[1].text.match(/\((.*?)\)/)[1].split('/')[2];
            var thumbnail = item[0].text.match(/\[\]\((.*?)\)/)[1];
            var html = MdT.render(item);
            var images = html.match(/\<ul\>[\s\S]*\<\/ul\>/)[0];
            newObj[link] = {
                thumbnail,
                images,
                html
            };
            return newObj;
        }, {}),
        name: ''
    }),
    fetchRouteData({params: {name}}) {
        this.name = name;
    },
    methods: {
        scroll(e) {
            this.$refs.content.scrollLeft += -e.wheelDelta / 2;
        }
    },
    activated() {
        this.$emit('theme', 'mono');
    }
};