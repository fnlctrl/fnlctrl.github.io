import template from './template.html';
import gallery from 'gallery';

export default {
    template,
    components: {gallery},
    ready() {
        this.$dispatch('theme:set', 'blue');
    }
};