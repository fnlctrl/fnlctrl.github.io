import template from './template.html';

export default {
    template,
    ready() {
        this.$dispatch('theme:set', 'blue');
    }
};