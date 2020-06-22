<template>
  <div>
    <b-form-datepicker
      v-model="value"
      :date-format-options="{ day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' }"
      class="todo-box-header-search"
      placeholder="Search..."
    />
  </div>
</template>

<script>
export default {
  name: 'SearchDay',
  data: () => ({
    value: null
  }),
  watch: {
    value (newValue) {
      this.$store.dispatch('tasks/getTasks', newValue)
      this.$store.dispatch('today-expenses/getTodayExpenses', newValue)
    }
  }
}
</script>

<style scoped lang="sass">
</style>
