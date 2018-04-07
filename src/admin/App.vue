<template lang="pug">
    .admin
        header.header
          admin-header
        nav.tabs
            tabs
        main.content
            router-view

</template>

<script>
    import header from './components/header'
    import tabs from './components/tabs'
    import about from './components/about'

    export default {
        components: {
            adminHeader: header, tabs, about
        }
    }
</script>

<style scoped lang="scss">

</style>