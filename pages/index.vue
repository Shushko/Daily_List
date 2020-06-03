<template>
  <div class="container">
    <MainTasks />
  </div>
</template>

<script>
import MainTasks from '../components/main_page_tasks/MainTasks'
export default {
  components: { MainTasks }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
  margin-bottom: 100px
</style>
