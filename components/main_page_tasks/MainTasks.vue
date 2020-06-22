<template>
  <div class="todo-box">
    <div class="todo-box-header">
      <h3>Tasks:</h3>
    </div>
    <div class="todo-box-tasks">
      <table>
        <tr
          v-for="(task, index) of tasks"
          :key="task.index"
          class="todo-box-tasks-item"
        >
          <td>
            <label class="checkbox">
              <input type="checkbox" class="checkbox-input">
              <div
                class="checkbox-body"
                @click="onChangeStatus(task)"
              >
                <b-icon icon="check2" font-scale="1" v-show="task.done" />
              </div>
            </label>
          </td>
          <td>
            {{ index+1 }}
          </td>
          <td class="todo-box-tasks-item-content">
            <EditTask :task="task" />
          </td>
          <td>
            <RemoveButton :item="task" />
          </td>
        </tr>
      </table>
      <AddForm :day="value" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddForm from './AddForm'
import EditTask from './EditTask'
import RemoveButton from './RemoveButton'
export default {
  name: 'MainTasks',
  components: {
    RemoveButton,
    EditTask,
    AddForm
  },
  computed: {
    ...mapGetters({
      tasks: 'tasks/todos'
    })
  },
  methods: {
    ...mapActions({
      getTasks: 'tasks/getTasks'
    }),
    onChangeStatus (task) {
      this.$store.dispatch('tasks/onChangeStatus', task)
    }
  },
  mounted () {
    this.getTasks(this.$moment().format('YYYY-MM-DD'))
  }
}

</script>

<style scoped lang="sass">
.todo-box
  padding: 20px
  border: 1px solid darkgray
  width: 50%
  height: min-content
  border-radius: 4px
  &-header
    display: flex
    justify-content: space-between
    &-search
      width: 200px
  &-tasks
    margin-top: 30px
    table
      width: 100%
    &-item
      width: 100%
      transition: all 0.3s
      &-content
        width: 80%
      td
        padding: 5px
      .checkbox
        display: flex
        align-items: center
        &-body
          position: relative
          margin-top: 5px
          height: 16px
          width: 16px
          border: 1px solid darkgray
          border-radius: 3px
          cursor: pointer
          display: flex
          align-items: center
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
    &-item:hover
      background: #E5E5E5
</style>
