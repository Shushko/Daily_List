<template>
  <div />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UpdateData',
  data: () => ({
    added: false
  }),
  computed: {
    ...mapGetters({
      totalSumOfExpenses: 'all-expenses/totalSumOfExpenses',
      incomes: 'budget/incomes'
    })
  },
  mounted () {
    this.checkMonth()
    this.getTotalSumOfExpenses()
    this.getIncomes()
  },
  methods: {
    ...mapActions({
      getTotalSumOfExpenses: 'all-expenses/getTotalSumOfExpenses',
      getIncomes: 'budget/getIncomes'
    }),
    async checkMonth () {
      const result = await this.$axios.$get('/current-date')
      const month = result.date.slice(0, 7)
      const currentMonth = this.$moment().format('YYYY-MM')
      const previousMonth = this.totalSumOfExpenses[0].date.slice(0, 7)
      if (month !== currentMonth) {
        await this.$store.dispatch('statistics/addPreviousMonth', {
          month: previousMonth,
          expenses: this.totalSumOfExpenses,
          incomes: this.incomes
        })
      }
    }
  }
}
</script>
