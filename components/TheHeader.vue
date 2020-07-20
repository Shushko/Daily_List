<template>
  <div>
    <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <nuxt-link class="navbar-brand" :to="{ name: 'home' }">
          Daily List
        </nuxt-link>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" class="header_content" is-nav>
          <b-navbar-nav>
            <nuxt-link class="nav-link rounded" active-class="text-white" :to="{ name: 'finance' }">
              Finance
            </nuxt-link>
            <nuxt-link class="nav-link rounded" active-class="text-white" :to="{ name: 'statistics' }">
              Statistics
            </nuxt-link>
          </b-navbar-nav>
          <div class="today_budget_info_header">
            <TodayBudgetInfoHeader />
          </div>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import TodayBudgetInfoHeader from './main_page_budget/TodayBudgetInfoHeader'
export default {
  name: 'TheHeader',
  components: { TodayBudgetInfoHeader }
}
</script>

<style scoped lang="sass">
.header_content
  display: flex
  justify-content: space-between
.nav-link:hover
  background: rgba(255, 255, 255, 0.1)
.today_budget_info_header
  width: 35%
@media (max-width: 992px)
  .header_content
    display: block
  .today_budget_info_header
    width: 60%
</style>
