<template>
  <div class="todo-box">
    <h3>Today tasks:</h3>
    <div class="todo-box-tasks">
      <table>
        <tr
          v-for="(task, index) of tasks"
          :key="task.index"
          class="todo-list"
          :style="{ background: task.done === true ? 'palegreen' : 'white' }"
        >
          <td>
            <label class="checkbox">
              <input type="checkbox" class="checkbox-input">
              <div
                class="checkbox-body"
                :style="{ background: task.done === true ? 'black' : 'white' }"
                @click="onChangeStatus(task)"
              />
            </label>
          </td>
          <td>
            {{ index+1 }}
          </td>
          <td>
            <EditTask :task="task" />
          </td>
          <td class="remove-btn">
            <RemoveButton :item="task" />
          </td>
        </tr>
      </table>
      <AddForm />
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
    this.getTasks()
  }
}

</script>

<style scoped lang="sass">
.todo-box
  padding: 20px
  border: 1px solid darkgray
  width: 60%
  border-radius: 4px
.todo-box-tasks
  margin-top: 30px
  table
    width: 100%
.todo-list
  width: 100%
  border-bottom: 1px solid darkgray
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
    border: 1px solid darkgray
    border-radius: 3px
    cursor: pointer
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
.remove-btn
  float: right
</style>
