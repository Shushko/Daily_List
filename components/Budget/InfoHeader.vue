<template>
  <div class="info-header-container">
    <div class="info">
      <div class="info-item">
        <h6>Total Incomes</h6>
        <span class="value total-incomes">{{ getTotalIncomes }}</span>
      </div>
      <div class="info-item">
        <h6>Total Expenses</h6>
        <span class="value total-expenses">{{ getTotalExpenses }}</span>
      </div>
      <div class="info-item">
        <h6>Available Finance</h6>
        <span class="value">{{ calculateAvailableFinance }}</span>
      </div>
      <div class="info-item">
        <h6>Daily Budget</h6>
        <span class="value">{{ calculateDailyBudget }}</span>
      </div>
      <div class="info-item">
        <h6>Deferred ({{ percentageOfDeferred }}%)</h6>
        <span class="value">{{ calculateDeferredFinance }}</span>
      </div>
    </div>
    <div>
      <b-form-select v-model="value" :options="options" class="select_percentage mt-3" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InfoHeader',
  data: () => ({
    value: null,
    options: [
      { value: null, text: 'Change the percentage of deferred money...', disabled: true },
      { value: 0, text: '0%' },
      { value: 5, text: '5%' },
      { value: 10, text: '10%' },
      { value: 15, text: '15%' },
      { value: 20, text: '20%' },
      { value: 25, text: '25%' },
      { value: 30, text: '30%' }
    ]
  }),
  computed: {
    ...mapGetters({
      incomes: 'budget/incomes',
      expenses: 'expenses/allExpenses',
      todayBudget: 'today-budget-info/todayBudget',
      percentageOfDeferred: 'today-budget-info/percentageOfDeferred'
    }),
    getTotalIncomes () {
      return this.incomes.reduce((sum, n) => sum + Number(n.amount), 0)
    },
    getTotalExpenses () {
      return this.expenses.reduce((sum, n) => sum + Number(n.amount), 0)
    },
    calculateAvailableFinance () {
      if (this.getTotalExpenses + this.calculateDeferredFinance >= this.getTotalIncomes) {
        return 0
      }
      return Math.round(this.getTotalIncomes - this.getTotalExpenses - this.calculateDeferredFinance)
    },
    calculateDailyBudget () {
      if (this.todayBudget < 0) {
        return 0
      }
      return this.todayBudget
    },
    calculateDeferredFinance () {
      const value = Math.round((this.getTotalIncomes / 100) * this.percentageOfDeferred)
      this.$store.dispatch('today-budget-info/changeDeferredMoney', value)
      return value
    }
  },
  watch: {
    async value (newValue) {
      await this.$store.dispatch('today-budget-info/changePercentage', newValue)
      await this.$store.dispatch('today-budget-info/changeTodayBudget', {
        incomes: this.incomes,
        expenses: this.expenses,
        percentage: this.percentageOfDeferred
      })
    }
  }
}
</script>

<style scoped lang="sass">
.info-header-container
  margin: 0 auto
  width: 90%
  .info
    padding: 10px 0 10px 0
    display: flex
    justify-content: space-around
    border: 1px solid darkgray
    border-radius: 5px
    .info-item
      width: 20%
      text-align: center
      border-right: 1px solid darkgray
      &:last-child
        border: none
      &-deferred
        display: flex
        justify-content: space-around
      .value
        font-size: 20px
        font-weight: bold
      .total-incomes
        color: green
      .total-expenses
        color: indianred
</style>
