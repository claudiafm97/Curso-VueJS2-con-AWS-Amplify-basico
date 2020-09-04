<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbar" toggleable>
    <b-navbar-brand id="appTitle">{{ $store.state.appTitle }}</b-navbar-brand>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
            <b-nav-item to="/todos">Tareas GRAPHQL</b-nav-item>
            <b-nav-item to="/private-notes">Notas privadas</b-nav-item>
            <b-nav-item @click="closeSession">
                cerrar sesión {{ $store.state.auth.user.username }}</b-nav-item>
        </b-navbar-nav>
    </b-collapse>
</nav>
</template>

<script>
import {
    Auth
} from 'aws-amplify';
export default {
    name: 'AuthNavigationComponent',
    methods: {
        async closeSession() {
            try {
                await Auth.signOut();
                this.$notify({
                    group: 'app',
                    title: 'Auth',
                    text: `Has cerrado sesión satisfactoriamente`,
                    type: 'success'
                });
            } catch (e) {
                this.$notify({
                    group: 'app',
                    title: 'Auth',
                    text: 'Error cerrando sesión',
                    type: 'error'
                });
            }
        }
    }
}
</script>

<style>
#navbar {
    margin-top: -4%;
    box-shadow: 2px 4px 10px rgb(172, 170, 170);
}

#appTitle {
    color: #FFAD33;
}
</style>
