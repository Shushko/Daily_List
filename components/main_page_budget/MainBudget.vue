<template>
  <div class="main_budget-container">
    <div class="main_budget-title">
      <div class="main_budget-title-item">
        <h6>
          Daily budget:
        </h6>
        <span class="title-item">
          {{ currentBudget }}
        </span>
      </div>
      <div class="main_budget-title-item">
        <h6>
          Rest:
        </h6>
        <span class="title-item" :style="{ color: restCurrentBudget >= 0 ? 'green' : 'red' }">
          {{ restCurrentBudget }}
        </span>
      </div>
    </div>
    <div class="main_budget-content">
      <table>
        <tr v-for="(item, index) of todayExpenses" :key="item.id">
          <td>{{ index+1 }}</td>
          <td class="main_budget-content-item">
            {{ item.expense }}
          </td>
          <td class="main_budget-content-amount">
            {{ item.amount }}
          </td>
          <td>
            <b-icon
              icon="trash-fill"
              font-scale="1"
              @click="onRemoveItem(item.id)"
              class="remove-item"
            />
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
    this.getTodayExpenses(this.$moment().format('YYYY-MM-DD'))
    this.getExpenses()
    this.getIncomes()
  }
}
</script>

<style scoped lang="sass">
  .main_budget-container
    width: 35%
    height: min-content
    padding: 20px
    border: 1px solid darkgray
    border-radius: 4px
    .main_budget-title
      width: 100%
      display: flex
      border-bottom: 1px solid darkgray
      padding: 10px
      &-item
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
    .main_budget-content
      margin-top: 30px
      table
        width: 100%
        tr
          transition: all 0.3s
        tr:hover
          background: #E5E5E5
        td
          padding: 5px
      &-item
        width: 60%
      &-amount
        margin: 5px
      .remove-item
        float: right
        cursor: pointer
        transition: all 0.3s
        &:hover
          color: indianred
</style>
