module.exports = {
    props: {
        name: {
            type: String,
            required: true
        }
    },
    template: `<svg icon><use v-bind="{'xlink:href': name}"></use></svg>`
};