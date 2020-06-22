<template>
  <div>
    <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="dark">
      <nuxt-link class="navbar-brand" :to="{ name: 'home' }">
        Daily List
      </nuxt-link>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <nuxt-link class="nav-link rounded" active-class="text-white" :to="{ name: 'finance' }">
            Finance
          </nuxt-link>
          <nuxt-link class="nav-link rounded" active-class="text-white" :to="{ name: 'search-daily-expenses' }">
            Search daily expenses
          </nuxt-link>
        </b-navbar-nav>
        <SearchDay />
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import SearchDay from './SearchDay'
export default {
  name: 'TheHeader',
  components: { SearchDay }
}
</script>

<style scoped lang="sass">
.nav-link:hover
  background: rgba(255, 255, 255, 0.1)
</style>
