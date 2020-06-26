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
    value: new Date()
  }),
  watch: {
    value (newValue) {
      this.$store.dispatch('tasks/getTasks', newValue)
      this.$store.commit('search/changeSelectedDate', this.value)
    }
  },
  mounted () {
    this.$store.commit('search/changeSelectedDate', this.$moment().format('YYYY-MM-DD'))
  }
}
</script>

<style scoped lang="sass">
</style>
