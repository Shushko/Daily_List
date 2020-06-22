<template>
  <form class="add-box" @submit.prevent="onAddTodo">
    <input v-model="todo" class="form-control" placeholder="Type new task...">
    <div>
      <button class="btn btn-sm btn-outline-primary">
        <b-icon
          icon="plus"
          font-scale="1.8"
          type="submit"
        />
      </button>
    </div>
  </form>
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
  display: flex
  justify-content: space-between
  align-items: center
  input
    width: 85%
</style>
