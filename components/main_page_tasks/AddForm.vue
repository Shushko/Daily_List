<template>
  <div class="add-box">
    <form @submit.prevent="onAddTodo">
      <form-group>
        <input v-model="todo" class="form-control" placeholder="Type new task...">
        <div>
          <button type="submit" class="btn btn-sm btn-primary mt-3">
            Add new task
          </button>
        </div>
      </form-group>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddForm',
  props: {
    day: {
      type: String,
      required: true
    }
  },
  data: () => ({
    todo: '',
    done: false
  }),
  methods: {
    onAddTodo () {
      if (this.todo) {
        if (!this.day) {
          this.day = this.$moment().format('YYYY-MM-DD')
        }
        this.$store.dispatch('tasks/onAddTodo', {
          data: this.day,
          todo: this.todo,
          done: this.done
        })
        this.todo = ''
      }
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
