<template>
  <div class="container">
    <b-form-spinbutton
      v-model="valueYears"
      min="2000"
      max="2030"
      wrap
    ></b-form-spinbutton>
    <b-form-spinbutton
      v-model="valueMonths"
      :formatter-fn="monthFormatter"
      min="0"
      max="11"
      wrap
    ></b-form-spinbutton>
    <div class="content">
      {{ expensesOfMonth }}
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
      incomes: 'budget/incomes'
    }),
    expensesOfMonth () {
      let month = this.valueMonths + 1
      if (month < 10) {
        month = '0' + month
      }
      if (`${this.valueYears}-${month}` === this.$moment().format('YYYY-MM')) {
        const currentStatistics = {
          expenses: this.totalSumOfExpenses,
          incomes: this.incomes
        }
        return currentStatistics
      }
      return this.previousExpenses
    }
  },
  methods: {
    ...mapActions({
      getExpensesOfMonth: 'statistics/getExpensesOfMonth',
      getTotalSumOfExpenses: 'all-expenses/getTotalSumOfExpenses',
      getIncomes: 'budget/getIncomes'
    }),
    monthFormatter (value) {
      return this.months[value]
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
  }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
</style>
