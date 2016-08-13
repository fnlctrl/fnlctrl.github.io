<template>
    <div id="app" @click="profileActive = false">
        <navigation></navigation>
        <transition @enter="theme = nextTheme" name="crossfade">
            <keep-alive>
                <router-view class="view" :class="{transform: profileActive}" @theme="setTheme"></router-view>
            </keep-alive>
        </transition>
        <profile v-model="profileActive"></profile>
    </div>
</template>
<script src="./app.js"></script>