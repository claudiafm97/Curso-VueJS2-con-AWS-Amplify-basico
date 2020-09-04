<template>
<div id="app">
    <auth-navigation-component v-if="!!$store.state.auth.user" />
    <guest-navigation-component v-else />

    <notifications group="app" position="bottom center"></notifications>

    <b-container class="mt-5">
        <router-view />
    </b-container>

</div>
</template>

<script>
import GuestNavigationComponent from './components/navigations/Guest';
import AuthNavigationComponent from './components/navigations/Auth';
import {
    Auth
} from 'aws-amplify';
export default {
    components: {
        AuthNavigationComponent,
        GuestNavigationComponent
    },
    async mounted() {
        await Auth.currentAuthenticatedUser()
            .then(user => this.$store.commit('auth/setUser', user, {
                root: true
            }))
            .catch(error => this.$store.commit('auth/setUser', null, {
                root: true
            }))
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
