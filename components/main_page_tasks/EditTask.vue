<template>
  <div @dblclick="onEditMode(task)">
    <div v-show="!isEdit">
      {{ task.todo }}
    </div>
    <div v-show="isEdit">
      <input
        :ref="'input_item_' + task.id"
        :value="task.todo"
        type="text"
        @keyup.enter="saveItemTodo(task.id, $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditTask',
  props: {
    task: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    isEdit: false
  }),
  methods: {
    onEditMode (task) {
      this.isEdit = true
      this.$nextTick(() => {
        this.$refs['input_item_' + task.id].focus()
      })
    },
    saveItemTodo (itemId, value) {
      if (value) {
        this.$store.dispatch('tasks/changeItemTodo', { itemId, value })
      }
      this.isEdit = false
    }
  }
}
</script>

<style scoped lang="sass">
</style>
