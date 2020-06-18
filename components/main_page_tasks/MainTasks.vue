<template>
  <div class="todo-box">
    <div class="todo-box-header">
      <h3>Today tasks:</h3>
      <b-form-datepicker
        v-model="value"
        :date-format-options="{ day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' }"
        class="todo-box-header-search"
        placeholder="Search..."
      />
    </div>
    <div class="todo-box-tasks">
      <table>
        <tr
          v-for="(task, index) of tasks"
          :key="task.index"
          class="todo-box-tasks-item"
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
          <td class="todo-box-tasks-item-content">
            <EditTask :task="task" />
          </td>
          <td class="remove-button">
            <RemoveButton :item="task" />
          </td>
        </tr>
      </table>
      <AddForm :day="value"/>
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
  data: () => ({
    value: null
  }),
  watch: {
    value (newValue) {
      this.$store.dispatch('tasks/getTasks', newValue)
    }
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
  width: 60%
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
      border-bottom: 1px solid darkgray
      &-content
        width: 60%
      td
        padding: 5px
      .remove-button
        float: right
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
</style>
