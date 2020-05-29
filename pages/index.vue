<template>
  <div class="container">
    <MainTasks :tasks="todos" />
  </div>
</template>

<script>
import MainTasks from '../components/MainTasks'
export default {
  components: { MainTasks },
  async asyncData ({ $axios }) {
    let todos = []
    try {
      todos = await $axios.$get('/tasks')
    } catch (e) {
      console.log(e)
    }
    return { todos }
  }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
  margin-bottom: 100px
</style>
