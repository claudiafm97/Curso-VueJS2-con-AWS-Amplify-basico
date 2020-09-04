<template>
<div>
    <amplify-authenticator />
    <amplify-sign-out v-if="!!$store.state.auth.user" />
</div>
</template>

<script>
export default {
    name: 'AuthenticationPage'
}
</script>
