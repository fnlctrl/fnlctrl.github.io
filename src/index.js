import Vue from 'vue';
import VueRouter from 'vue-router';
//import marked from 'marked';
Vue.use(VueRouter);

import 'index.less';
import 'themes.less';

/* Components */
import navigation from 'navigation';
import about from 'about';

/* Views */
import resume from 'views/resume';
import designs from 'views/designs';
import projects from 'views/projects';

var app = {
    components: {navigation, about},
    data: () => ({
        theme: 'mono'
    }),
    events: {
        'theme:set'(theme) {this.theme = theme; }
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
    },
    '/projects': {
        component: projects
    }
};

router.map(map);
router.start(app, 'body');