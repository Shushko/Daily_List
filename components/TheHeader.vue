<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <nuxt-link class="navbar-brand" :to="{ name: 'home' }">Daily List</nuxt-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="{ name: 'tasks' }">Tasks</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="{ name: 'finance' }">Finance</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="{ name: 'search-daily-expenses' }">Search Daily Expenses</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped lang="sass">
.nav-item
  margin-left: 30px
</style>
