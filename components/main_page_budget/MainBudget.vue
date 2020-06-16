<template>
  <div class="main-budget-container">
    <div class="main-budget-title">
      <div class="main-budget-title-item">
        <h6>
          Daily budget:
        </h6>
        <span class="title-item">
          {{ currentBudget }}
        </span>
      </div>
      <div class="main-budget-title-item">
        <h6>
          Rest:
        </h6>
        <span class="title-item" :style="{ color: restCurrentBudget >= 0 ? 'green' : 'red' }">
          {{ restCurrentBudget }}
        </span>
      </div>
    </div>
    <div class="main-budget-content">
      <table>
        <tr v-for="(item, index) of todayExpenses" :key="item.id">
          <td>{{ index+1 }}</td>
          <td class="main-budget-content-item">
            {{ item.expense }}
          </td>
          <td class="main-budget-content-amount">
            {{ item.amount }}
          </td>
          <td>
            <button class="btn btn-sm btn-outline-danger remove-item" @click="onRemoveItem(item.id)">
              Remove
            </button>
          </td>
        </tr>
      </table>
      <FormForAdd :nameForRequest="'today-expenses'" :listWithValues="todayExpenses" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormForAdd from '../Budget/FormForAdd'
export default {
  name: 'MainBudget',
  components: { FormForAdd },
  computed: {
    ...mapGetters({
      todayExpenses: 'today-expenses/todayExpenses',
      expenses: 'all-expenses/expenses',
      incomes: 'budget/incomes'
    }),
    currentBudget () {
      const inFinance = this.incomes.reduce((sum, n) => sum + Number(n.amount), 0)
      const outFinance = this.expenses.reduce((sum, n) => sum + Number(n.amount), 0)
      return Math.round((inFinance - (inFinance / 10) - outFinance) / (this.$moment().daysInMonth() - this.$moment().date() + 1))
    },
    restCurrentBudget () {
      const dailyExpenses = this.todayExpenses.reduce((sum, n) => sum + Number(n.amount), 0)
      return this.currentBudget - dailyExpenses
    }
  },
  methods: {
    ...mapActions({
      getTodayExpenses: 'today-expenses/getTodayExpenses',
      getExpenses: 'all-expenses/getExpenses',
      getIncomes: 'budget/getIncomes'
    }),
    onRemoveItem (itemId) {
      this.$store.dispatch('today-expenses/onRemoveItem', itemId)
    }
  },
  mounted () {
    this.getTodayExpenses()
    this.getExpenses()
    this.getIncomes()
  }
}
</script>

<style scoped lang="sass">
  .main-budget-container
    width: 35%
    height: min-content
    padding: 20px
    border: 1px solid darkgray
    border-radius: 4px

    .main-budget-title
      width: 100%
      display: flex
      border-bottom: 1px solid darkgray
      padding: 10px

      .main-budget-title-item
        width: 50%
        display: flex
        justify-content: center
        align-items: baseline
        border-left: 1px solid darkgray

        &:first-child
          border: none

        .title-item
          margin-left: 10px
          font-weight: bold

    .main-budget-content
      margin-top: 30px

      td
        padding: 5px

      .main-budget-content-item
        width: 60%

      .main-budget-content-amount
        float: right
        margin: 5px

      .remove-item
        float: right
</style>
