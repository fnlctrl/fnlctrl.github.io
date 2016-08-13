import template from './template.html';
import gallery from 'gallery';

export default {
    template,
    components: {gallery},
    activated() {
        this.$emit('theme', 'blue');
    }
};