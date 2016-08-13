/**
 * VueRouteData plugin for vue-router@2.0 and vue@1or2,
 * implemented according to https://github.com/vuejs/vue-router/issues/296#issuecomment-235481643
 *
 * This plugin looks for `$options.fetchRouteData`,
 * and watches `$route` using `$options.fetchRouteData` as handler.
 *
 * Before `fetchRouteData` executes, this plugin sets 'loadingRouteData' to true,
 * and when it finishes executing, the plugin sets 'loadingRouteData' to false,
 * so `fetchRouteData` can either be normal functions or async functions.
 * Note: you need to define `loadingRouteData` in component's data option to get this working.
 *
 * It also injects two helper functions, `$setAsyncData` and `$reloadRouteData`,
 * for details see below.
 *
 * Usage: (babel and Promise polyfill required)
 * import VueRouter from '...'
 * import VueRouteData from '...'
 * Vue.use(VueRouter).use(VueRouteData)
 *
 * Author: fnlCtrl(fnlctrl@gmail.com)
 * License: MIT
 */

function install(Vue) {
    if (install.installed) return;
    install.installed = true;

    const isVersion1 = Vue.version[0] == '1';
    const mixin = {
        [isVersion1 ? 'init' : 'beforeCreate']() {
            if (this.$options.fetchRouteData) {
                !this.$options.methods && (this.$options.methods = {});
                /**
                 * Utility method for setting async data (promises or then-ables) on an instance
                 * @param promises - {key: promise}
                 */
                this.$options.methods.$setAsyncData = promises => Promise.all(
                    Object
                        .keys(promises)
                        .map(key => Promise
                            .resolve(promises[key])
                            .then(val => Vue.set(this, key, val))
                        )
                );
                /**
                 * Utility method for reloading route data
                 */
                this.$options.methods.$reloadRouteData =
                    () => this.$options.fetchRouteData(this.$route);
            }
        },
        created: initWatcher,
        beforeDestroy: destroyWatcher,
        /* Keep-alive support */
        [isVersion1 ? 'attached' : 'activated']: initWatcher,
        [isVersion1 ? 'detached' : 'deactivated']: destroyWatcher
    };
    Vue.mixin(mixin);

    function initWatcher() {
        if (this.$options.fetchRouteData && !this._unwatch$route) {
            this._unwatch$route = this.$watch(
                '$route',
                function () {
                    var hasLoadingRouteData = this.loadingRouteData !== undefined;
                    hasLoadingRouteData && Vue.set(this, 'loadingRouteData', true);
                    var promise = this.$options.fetchRouteData.apply(this, arguments);
                    hasLoadingRouteData && Promise.resolve(promise).then(() => Vue.set(this, 'loadingRouteData', false));
                },
                {immediate: true}
            );
        }
    }
}

function destroyWatcher() {
    this._unwatch$route && this._unwatch$route();
    this._unwatch$route = null;
}

export default {
    install
}