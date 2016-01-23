import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import 'index.less';

/* Components */
import navigation from 'navigation';

/* Views */
import resume from 'views/resume';
import designs from 'views/designs';

var app = {
    components: {navigation}
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