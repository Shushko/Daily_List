<template>
  <div class="content_info">
    <div class="content_info-title">
      <span class="content_info-title-name">
        Daily budget:
      </span>
      <span class="content_info-title-item">
        {{ todayBudget }}
      </span>
    </div>
    <div class="content_info-title">
      <span class="content_info-title-name">
        Rest:
      </span>
      <span class="content_info-title-item" :style="{ color: restCurrentBudget >= 0 ? 'green' : 'red' }">
        {{ restCurrentBudget }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TodayBudgetInfoHeader',
  computed: {
    ...mapGetters({
      currentExpensesList: 'expenses/currentExpensesList',
      expenses: 'expenses/allExpenses',
      incomes: 'budget/incomes',
      todayBudget: 'budget/todayBudget'
    }),
    restCurrentBudget () {
      const dailyExpenses = this.currentExpensesList.reduce((sum, n) => sum + Number(n.amount), 0)
      return this.todayBudget - dailyExpenses
    }
  },
  methods: {
    ...mapActions({
      getTodayExpenses: 'expenses/getTodayExpenses',
      getExpenses: 'expenses/getAllExpenses',
      getIncomes: 'budget/getIncomes',
      getTodayBudget: 'budget/getTodayBudget'
    }),
    async updateTodayBudget () {
      const result = await this.$axios.$get('/current-date')
      const currentDate = this.$moment().format('YYYY-MM-DD')
      if (result.date !== currentDate) {
        await this.$axios.$patch('/current-date', { date: currentDate })
        const inFinance = this.incomes.reduce((sum, n) => sum + Number(n.amount), 0)
        const outFinance = this.expenses.reduce((sum, n) => sum + Number(n.amount), 0)
        const currentTodayBudget = Math.round((inFinance - (inFinance / 10) - outFinance) / (this.$moment().daysInMonth() - this.$moment().date() + 1))
        await this.$store.dispatch('budget/changeTodayBudget', currentTodayBudget)
      }
    }
  },
  mounted () {
    this.getTodayExpenses(this.$moment().format('YYYY-MM-DD'))
    this.getExpenses()
    this.getIncomes()
    this.getTodayBudget()
    this.updateTodayBudget()
  }
}
</script>

<style scoped lang="sass">
.content_info
  color: white
  display: flex
  &-title
    width: 50%
    display: flex
    justify-content: center
    align-items: baseline
    border-left: 1px solid darkgray
    &:first-child
      border: none
    &-name
      color: darkgray
    &-item
      margin-left: 5%
      font-weight: bold
</style>
