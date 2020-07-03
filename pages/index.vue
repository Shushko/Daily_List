<template>
  <div class="container">
    <UpdateMonth />
    <div class="head">
      <SearchDay class="head-date_picker" />
    </div>
    <div class="content">
      <MainTasks />
      <MainBudget />
    </div>
  </div>
</template>

<script>
import MainTasks from '../components/main_page_tasks/MainTasks'
import MainBudget from '../components/main_page_budget/MainBudget'
import UpdateMonth from '../components/UpdateMonth'
import SearchDay from '../components/SearchDay'

export default {
  components: { SearchDay, UpdateMonth, MainBudget, MainTasks }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
  margin-bottom: 100px
  .head
    display: flex
    justify-content: space-between
  .head-date_picker
    width: 200px
  .content
    margin-top: 30px
    display: flex
    justify-content: space-between
  @media (max-width: 990px)
    .content
      flex-direction: column
      align-items: center
</style>
