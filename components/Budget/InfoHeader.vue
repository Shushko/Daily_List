<template>
  <div class="info-header-container">
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
      <span class="value">{{ todayBudget }}</span>
    </div>
    <div class="info-item">
      <h6>Deferred</h6>
      <span class="value">{{ calculateDeferredFinance }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InfoHeader',
  computed: {
    ...mapGetters({
      incomes: 'budget/incomes',
      expenses: 'expenses/allExpenses',
      todayBudget: 'today-budget-info/todayBudget'
    }),
    getTotalIncomes () {
      return this.incomes.reduce((sum, n) => sum + Number(n.amount), 0)
    },
    getTotalExpenses () {
      return this.expenses.reduce((sum, n) => sum + Number(n.amount), 0)
    },
    calculateAvailableFinance () {
      return Math.round(this.getTotalIncomes - this.getTotalExpenses - this.calculateDeferredFinance)
    },
    calculateDeferredFinance () {
      return Math.round(this.getTotalIncomes / 10)
    }
  }
}
</script>

<style scoped lang="sass">
.info-header-container
  margin: 0 auto
  width: 90%
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
    .value
      font-size: 20px
      font-weight: bold
    .total-incomes
      color: green
    .total-expenses
      color: indianred
</style>
