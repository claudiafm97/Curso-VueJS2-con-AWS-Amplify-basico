<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbar" toggleable>
    <b-navbar-brand id="appTitle">{{ $store.state.appTitle }}</b-navbar-brand>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
            <b-nav-item to="/authentication">Autenticación</b-nav-item>
        </b-navbar-nav>
    </b-collapse>
</nav>
</template>

<script>
export default {
    name: 'GuestNavigationComponent'
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
