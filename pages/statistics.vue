<template>
  <div class="container">
    <b-form-spinbutton
      v-model="valueYears"
      min="2000"
      max="2030"
      wrap
    />
    <b-form-spinbutton
      v-model="valueMonths"
      :formatter-fn="monthFormatter"
      class="mt-3"
      min="0"
      max="11"
      wrap
    />
    <div
      v-show="Object.keys(budgetOfMonth).length !== 0"
      class="content"
    >
      <div class="budget_section">
        <h3>Monthly statistics</h3>
        <table class="total_list">
          <tr>
            <td class="total_list-item">
              Total incomes:
            </td>
            <td class="total_list-amount">
              {{ budgetOfMonth.sumOfIncomes }}
            </td>
          </tr>
          <tr>
            <td class="total_list-item">
              Total expenses:
            </td>
            <td class="total_list-amount">
              {{ budgetOfMonth.sumOfExpenses }}
            </td>
          </tr>
          <tr>
            <td class="total_list-item">
              Deferred money:
            </td>
            <td class="total_list-amount">
              {{ budgetOfMonth.deferredMoney }}
            </td>
          </tr>
        </table>
      </div>
      <div class="budget_section">
        <h3>All incomes</h3>
        <table class="total_list">
          <tr v-for="(item, index) of budgetOfMonth.incomes" :key="item.id">
            <td>{{ index+1 }}</td>
            <td class="total_list-item">
              {{ item.source }}
            </td>
            <td class="total_list-amount">
              {{ item.amount }}
            </td>
          </tr>
        </table>
        <div class="total-item">
          Total
          <span class="total-sum">{{ budgetOfMonth.sumOfIncomes }}</span>
        </div>
      </div>
      <div class="budget_section">
        <h3>All expenses</h3>
        <table class="total_list">
          <tr v-for="(item, index) of budgetOfMonth.expenses" :key="item.id">
            <td>{{ index+1 }}</td>
            <td class="total_list-item">
              {{ item.expense }}
            </td>
            <td class="total_list-amount">
              {{ item.amount }}
            </td>
          </tr>
        </table>
        <div class="total-item">
          Total
          <span class="total-sum">{{ budgetOfMonth.sumOfExpenses }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SearchDailyExpenses',
  data: () => ({
    valueYears: new Date().getFullYear(),
    valueMonths: new Date().getMonth(),
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }),
  computed: {
    ...mapGetters({
      previousExpenses: 'statistics/expensesOfMonth',
      totalSumOfExpenses: 'all-expenses/totalSumOfExpenses',
      incomes: 'budget/incomes',
      deferredMoney: 'today-budget-info/deferredMoney'
    }),
    getTotalIncomes () {
      return this.incomes.reduce((sum, n) => sum + Number(n.amount), 0)
    },
    getTotalExpenses () {
      return this.totalSumOfExpenses.reduce((sum, n) => sum + Number(n.amount), 0)
    },
    budgetOfMonth () {
      let month = this.valueMonths + 1
      if (month < 10) {
        month = '0' + month
      }
      if (`${this.valueYears}-${month}` === this.$moment().format('YYYY-MM')) {
        return {
          expenses: this.totalSumOfExpenses,
          incomes: this.incomes,
          sumOfIncomes: this.getTotalIncomes,
          sumOfExpenses: this.getTotalExpenses,
          deferredMoney: this.deferredMoney
        }
      }
      if (this.previousExpenses) {
        return this.previousExpenses
      }
      return {}
    }
  },
  watch: {
    valueYears (newValue) {
      this.$store.dispatch('statistics/getExpensesOfMonth', {
        valueYears: newValue,
        valueMonths: this.valueMonths
      })
    },
    valueMonths (newValue) {
      newValue += 1
      if (newValue < 10) {
        newValue = '0' + newValue
      }
      this.$store.dispatch('statistics/getExpensesOfMonth', {
        valueYears: this.valueYears,
        valueMonths: newValue
      })
    }
  },
  mounted () {
    this.getExpensesOfMonth()
    this.getTotalSumOfExpenses()
    this.getIncomes()
    this.getDeferredMoney()
  },
  methods: {
    ...mapActions({
      getExpensesOfMonth: 'statistics/getExpensesOfMonth',
      getTotalSumOfExpenses: 'all-expenses/getTotalSumOfExpenses',
      getIncomes: 'budget/getIncomes',
      getDeferredMoney: 'today-budget-info/getDeferredMoney'
    }),
    monthFormatter (value) {
      return this.months[value]
    }
  }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
  .content
    margin-top: 30px
    display: flex
    justify-content: space-around
    .budget_section
      width: 30%
      height: min-content
      padding: 10px
      border: 1px solid darkgray
      border-radius: 5px
      h3
        margin-left: 5px
        text-decoration: underline
      td
        padding: 5px
      .total_list
        margin-top: 30px
        width: 100%
        &-item
          width: 70%
        &-amount
          float: right
      .total-item
        margin-left: 5px
        margin-top: 20px
        padding-top: 15px
        border-top: 1px solid darkgray
        font-weight: bold
        .total-sum
          float: right
          margin-right: 5px
</style>
