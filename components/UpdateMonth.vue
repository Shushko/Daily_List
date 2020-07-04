<template>
  <div />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UpdateData',
  computed: {
    ...mapGetters({
      totalSumOfExpenses: 'all-expenses/totalSumOfExpenses',
      incomes: 'budget/incomes',
      deferredMoney: 'today-budget-info/deferredMoney'
    })
  },
  mounted () {
    this.checkMonth()
    this.getTotalSumOfExpenses()
    this.getIncomes()
    this.getDeferredMoney()
  },
  methods: {
    ...mapActions({
      getTotalSumOfExpenses: 'all-expenses/getTotalSumOfExpenses',
      getIncomes: 'budget/getIncomes',
      getDeferredMoney: 'today-budget-info/getDeferredMoney'
    }),
    async checkMonth () {
      const result = await this.$axios.$get('/current-date')
      const month = result.date.slice(0, 7)
      const currentMonth = this.$moment().format('YYYY-MM')
      if (month !== currentMonth) {
        const previousMonth = this.totalSumOfExpenses[0].date.slice(0, 7)
        const totalIncomes = this.incomes.reduce((sum, n) => sum + Number(n.amount), 0)
        const totalExpenses = this.totalSumOfExpenses.reduce((sum, n) => sum + Number(n.amount), 0)
        await this.$store.dispatch('statistics/addPreviousMonth', {
          month: previousMonth,
          sumOfIncomes: totalIncomes,
          sumOfExpenses: totalExpenses,
          deferredMoney: this.deferredMoney,
          expenses: this.totalSumOfExpenses,
          incomes: this.incomes
        })
      }
    }
  }
}
</script>
