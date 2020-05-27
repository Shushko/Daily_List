<template>
  <div @dblclick="editTitleMode(task)">
    <div v-show="!task.edit_mode">
      {{ task.todo }}
    </div>
    <div v-show="task.edit_mode">
      <input
        :ref="'input_item_' + task.id"
        v-model="task.todo"
        type="text"
        @keyup.enter="saveItemTitle(task)"
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
  methods: {
    editTitleMode (task) {
      this.$set(task, 'edit_mode', true)
      this.$nextTick(() => {
        this.$refs['input_item_' + task.id].focus()
      })
    },
    async saveItemTitle (task) {
      await this.$axios.$patch(`/tasks/${this.task.id}`, { todo: this.task.todo })
      task.edit_mode = false
    }
  }
}
</script>

<style scoped lang="sass">
</style>
