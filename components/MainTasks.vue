<template>
  <div class="container">
    <div class="todo-box">
      <h3>Today tasks:</h3>
      <div class="todo-box-tasks">
        <table>
          <tr v-for="(task, index) of tasks" :key="task.index" class="todo-list">
            <td>
              <label class="checkbox">
                <input type="checkbox" class="checkbox-input">
                <div class="checkbox-body" @click="onToggleItem(task.id)" />
              </label>
            </td>
            <td>
              {{ index+1 }}
            </td>
            <td>
              <div class="item-list">
                {{ task.todo }}
              </div>
            </td>
            <td>
              <button class="btn btn-sm btn-outline-success">
                Edit
              </button>
            </td>
            <td>
              <button class="btn btn-sm btn-outline-danger">
                Remove
              </button>
            </td>
          </tr>
        </table>
        {{ IdTasks }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainTasks',
  props: {
    tasks: {
      type: Array,
      required: false
    }
  },
  data: () => ({
    IdTasks: []
  }),
  methods: {
    onToggleItem (item) {
    }
  }
}
</script>

<style scoped lang="sass">
.todo-box
  margin-top: 30px
  padding: 20px
  border: 1px solid #cacaca
  width: 60%
  border-radius: 4px
.todo-box-tasks
  margin-top: 30px
.todo-list
  width: 100%
  border-bottom: 1px solid #cacaca
  td
    padding: 5px
.checkbox
  display: flex
  align-items: center
  .checkbox-body
    position: relative
    margin-top: 5px
    height: 16px
    width: 16px
    border: 1px solid #cacaca
    border-radius: 3px
  &-input
    z-index: -1
    opacity: 0
    position: absolute
    &:checked + .checkbox-body:after
      content: ''
      margin-left: 1px
      margin-top: 1px
      position: absolute
      height: 12px
      width: 12px
      background: lightgreen
</style>
