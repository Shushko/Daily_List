<template>
  <div class="content_info">
    <div class="content_info-title">
      <span class="content_info-title-name">
        Daily budget:
      </span>
      <span class="content_info-title-item">
        {{ calculateDailyBudget }}
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
      expenses: 'expenses/expensesOfDay',
      incomes: 'budget/incomes',
      todayBudget: 'today-budget-info/todayBudget',
      allExpenses: 'expenses/allExpenses',
      percentageOfDeferred: 'today-budget-info/percentageOfDeferred'
    }),
    currentExpensesList () {
      return this.allExpenses.filter(n => n.date === this.$moment().format('YYYY-MM-DD'))
    },
    restCurrentBudget () {
      const dailyExpenses = this.currentExpensesList.reduce((sum, n) => sum + Number(n.amount), 0)
      return this.todayBudget - dailyExpenses
    },
    calculateDailyBudget () {
      if (this.todayBudget < 0) {
        return 0
      }
      return this.todayBudget
    }
  },
  methods: {
    ...mapActions({
      getIncomes: 'budget/getIncomes',
      getTodayBudget: 'today-budget-info/getTodayBudget',
      getAllExpenses: 'expenses/getAllExpenses',
      getPercentage: 'today-budget-info/getPercentage'
    }),
    async updateTodayBudget () {
      const result = await this.$axios.$get('/current-date')
      const currentDate = this.$moment().format('YYYY-MM-DD')
      if (result.date !== currentDate) {
        await this.$axios.$patch('/current-date', { date: currentDate })
        await this.$store.dispatch('today-budget-info/changeTodayBudget', {
          incomes: this.incomes,
          expenses: this.allExpenses,
          percentage: this.percentageOfDeferred
        })
      }
    }
  },
  mounted () {
    this.getIncomes()
    this.getTodayBudget()
    this.getAllExpenses()
    this.getPercentage()
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
