import gallery from 'gallery';

export default {
    components: {gallery},
    activated() {
        this.$emit('theme', 'blue');
    }
};