<template>
  <div>
    <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <nuxt-link class="navbar-brand" :to="{ name: 'home' }">Daily List</nuxt-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <nuxt-link class="nav-link" :to="{ name: 'finance' }">Finance</nuxt-link>
            <nuxt-link class="nav-link" :to="{ name: 'search-daily-expenses' }">Search daily expenses</nuxt-link>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped lang="sass">
.nav-link:first-child
  margin-left: 30px
</style>
