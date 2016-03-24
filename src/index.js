/* Stylesheets */
import 'index.less';
import 'themes.less';

/* Libs */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';

/* Locales */
import locales from 'locales';

Vue.use(VueRouter).use(VueI18n, {lang: 'en', locales});
Vue.config.debug = /localhost/.test(location.href);

/* Components */
import navigation from 'navigation';
import profile from 'profile';

/* Views */
import index from 'views/index';
import resume from 'views/resume';
import designs from 'views/designs';
import projects from 'views/projects';
import detail from 'views/detail';

var app = {
    components: {navigation, profile},
    data: () => ({
        theme: 'mono'
    }),
    methods: {
        hideAbout() {
            this.$broadcast('about:hide')
        }
    },
    events: {
        'theme:set'(theme) {
            this.theme = theme;
        }
    }
};
var router = new VueRouter({
    transitionOnLoad: true,
    history: true
});
var map = {
    '/': {
        component: index
    },
    '/resume': {
        component: resume
    },
    '/designs': {
        component: designs,
        subRoutes: {
            '/:name': {
                component: detail
            }
        }
    },
    '/projects': {
        component: projects,
        subRoutes: {
            '/:name': {
                component: detail
            }
        }
    }
};

router.map(map);
router.start(app, 'body');