<template>
  <div class="add-box">
    <form @submit="onAddTodo">
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
import { mapActions } from 'vuex'
export default {
  name: 'AddForm',
  data: () => ({
    todo: '',
    done: false
  }),
  methods: {
    ...mapActions({
      onAddTodo () {
        this.$store.dispatch('tasks/onAddTodo', {
          todo: this.todo,
          done: this.done
        })
        this.todo = ''
      }
    })
  }
}
</script>

<style scoped lang="sass">
.add-box
  margin-top: 30px
.add-box-input
  width: 90%
</style>
