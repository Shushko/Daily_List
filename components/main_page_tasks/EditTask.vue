<template>
  <div class="item_content">
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
    <b-icon icon="pencil-square" font-scale="1" class="item_content-edit_button" @click.stop="onEditMode(task)" />
  </div>
</template>

<script>
export default {
  name: 'EditTask',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isEdit: false
  }),
  mounted () {
    window.addEventListener('click', this.saveItemTodo)
  },
  methods: {
    onEditMode (task) {
      this.isEdit ? this.isEdit = false : this.isEdit = true
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
.item_content
  display: flex
  justify-content: space-between
  align-items: center
  &-edit_button
    float: right
    cursor: pointer
    transition: all 0.3s
  &-edit_button:hover
    color: green
</style>
