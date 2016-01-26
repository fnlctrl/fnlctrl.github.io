import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import 'index.less';
import 'themes.less';

/* Components */
import navigation from 'navigation';
import about from 'about';

/* Views */
import resume from 'views/resume';
import designs from 'views/designs';

var app = {
    components: {navigation,about},
    data: () => ({
        theme: 'mono'
    }),
    ready() {
        this.$on('theme:set', theme => this.theme = theme);
    }
};
var router = new VueRouter({
    transitionOnLoad: true,
    history: true
});
var map = {
    '/resume': {
        component: resume
    },
    '/designs': {
        component: designs
    }
};

router.map(map);
router.start(app, 'body');