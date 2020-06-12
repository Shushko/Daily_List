<template>
  <div class="container">
    <MainTasks />
    <MainBudget />
  </div>
</template>

<script>
import MainTasks from '../components/main_page_tasks/MainTasks'
import MainBudget from '../components/main_page_budget/MainBudget'
export default {
  components: { MainBudget, MainTasks }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
  margin-bottom: 100px
  display: flex
  justify-content: space-around
</style>
