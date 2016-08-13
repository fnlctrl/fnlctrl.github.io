/* Stylesheets */
import 'index.less';
import 'themes.less';

/* Libs */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import VueRouteData from 'plugins/vue-route-data';

/* Locales */
import locales from 'locales';

Vue.use(VueI18n, {lang: 'en', locales}).use(VueRouter).use(VueRouteData);
Vue.config.silent = !/localhost/.test(location.href);

/* Components */
import navigation from 'navigation';
import profile from 'profile';
Vue.component('icon', require('icon'));

/* Views */
import index from 'views/index';
import resume from 'views/resume';
import designs from 'views/designs';
import projects from 'views/projects';
import detail from 'views/detail';

import canvasBackground from 'canvas-background';

var routes = [
    {
        path: '/',
        redirect: '/resume'
        // component: index
    },
    {
        path: '/resume',
        component: resume
    },
    {
        path: '/designs',
        component: designs,
        children: [
            {
                path: ':name',
                name: 'detail',
                component: detail
            }
        ]
    },
    {
        path: '/projects',
        component: projects,
        children: [
            {
                path: ':name',
                component: detail
            }
        ]
    }
];

var router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
});

export default {
    el: '#app',
    router,
    components: {navigation, profile},
    data: () => ({
        theme: '',
        nextTheme: '',
        profileActive: false
    }),
    methods: {
        setTheme(theme) {
            if (!this.theme) {
                this.theme = theme;
            } else {
                this.nextTheme = theme;
            }
        }
    },
    watch: {
        theme(theme) {
            document.body.className = theme;
            if (theme === 'mono') {
                canvasBackground.config.color = '180,180,180';
            } else {
                canvasBackground.config.color = '255,255,255';
            }
        }
    },
    mounted() {
        this.$el.insertBefore(canvasBackground, this.$el.firstChild);
    }
}