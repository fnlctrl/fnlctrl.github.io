<template>
    <svg icon><use v-bind="{'xlink:href': name}"></use></svg>
</template>
<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            }
        }
    };
</script>