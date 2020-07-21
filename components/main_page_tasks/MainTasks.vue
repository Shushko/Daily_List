<template>
  <div class="main_tasks_container">
    <h3>Tasks:</h3>
    <table class="main_tasks_list">
      <tr
        v-for="(task, index) of tasks"
        :key="task.index"
        class="main_tasks_list-item"
      >
        <td>
          <label class="checkbox">
            <input type="checkbox" class="checkbox-input">
            <div
              class="checkbox-body"
              @click="onChangeStatus(task)"
            >
              <b-icon v-show="task.done" icon="check2" scale="2" class="mb-2" />
            </div>
          </label>
        </td>
        <td>{{ index+1 }}</td>
        <td class="main_tasks_list-item-content">
          <EditTask :task="task" />
        </td>
        <td>
          <RemoveButton :item="task" />
        </td>
      </tr>
    </table>
    <AddForm />
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
  mounted () {
    this.getTasks(this.$moment().format('YYYY-MM-DD'))
  },
  methods: {
    ...mapActions({
      getTasks: 'tasks/getTasks'
    }),
    onChangeStatus (task) {
      this.$store.dispatch('tasks/onChangeStatus', task)
    }
  }
}

</script>

<style scoped lang="sass">
.main_tasks_container
  padding: 10px
  border: 1px solid darkgray
  width: 50%
  height: min-content
  border-radius: 5px
  h3
    margin-left: 5px
    text-decoration: underline
  .main_tasks_list
    display: flex
    flex-direction: column
    margin-top: 30px
    width: 100%
    td
      padding: 7px
    &-item
      display: flex
      align-items: center
      transition: all 0.3s
      &:hover
        background: #E5E5E5
      .checkbox
        display: flex
        align-items: center
        &-body
          position: relative
          margin-top: 5px
          height: 12px
          width: 12px
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
      &-content
        width: 100%
@media (max-width: 992px)
  .main_tasks_container
    width: 100%
</style>
