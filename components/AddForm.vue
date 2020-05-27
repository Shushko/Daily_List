<template>
  <div class="add-box">
      <form @submit="onAddTodo">
        <form-group>
          <input v-model="task.todo" class="form-control" placeholder="Type new task...">
          <div><button type="submit" class="btn btn-sm btn-primary mt-3">Add new task</button></div>
        </form-group>
      </form>
  </div>
</template>

<script>
export default {
  name: 'AddForm',
  data: () => ({
    task: {
      todo: '',
      done: false
    }
  }),
  methods: {
    onAddTodo () {
      this.$axios.$post('/tasks', this.task)
    }
  }
}
</script>

<style scoped lang="sass">
.add-box
  margin-top: 30px
.add-box-input
  width: 90%
</style>
