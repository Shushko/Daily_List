<template>
  <form class="add-form" @submit.prevent="onAddNewExpense">
    <input
      v-model="expense"
      class="input_expense form-control"
      type="text"
      placeholder="Expense"
    >
    <b-form-select
      v-model="expense"
      :options="options"
      class="select_expense"
    />
    <input
      v-model="amount"
      class="input_amount form-control"
      type="text"
      placeholder="Sum"
      title="Use only numbers!"
      required
      pattern="^[0-9]+$"
    >
    <button class="btn btn-sm btn-outline-primary add-button">
      <b-icon
        icon="plus"
        font-scale="1.8"
        type="submit"
      />
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FormForAdd',
  data: () => ({
    expense: null,
    amount: null,
    options: [
      { value: null, text: 'Category', disabled: true },
      { value: 'Products', text: 'Products' },
      { value: 'Transport', text: 'Transport' },
      { value: 'Communal payments', text: 'Communal payments' },
      { value: 'Internet', text: 'Internet' },
      { value: 'Mobile', text: 'Mobile' },
      { value: 'Cafe', text: 'Cafe' }
    ]
  }),
  computed: {
    ...mapGetters({
      day: 'search/getSelectedDate',
      incomes: 'budget/incomes',
      allExpenses: 'expenses/allExpenses',
      percentageOfDeferred: 'today-budget-info/percentageOfDeferred'
    }),
    expensesOfDay () {
      return this.allExpenses.filter(n => n.date === this.day)
    }
  },
  methods: {
    async onAddNewExpense () {
      if (this.expense && this.amount) {
        const newItem = this.expensesOfDay.find(n => n.expense === this.expense)
        if (newItem) {
          await this.$store.dispatch('expenses/onAddExpense', {
            itemId: newItem.id,
            value: Math.round(this.amount) + Number(newItem.amount)
          })
        } else {
          await this.$store.dispatch('expenses/onAddNewExpense', {
            date: this.day,
            expense: this.expense,
            amount: Math.round(this.amount)
          })
        }
        if (this.day !== this.$moment().format('YYYY-MM-DD')) {
          await this.$store.dispatch('today-budget-info/changeTodayBudget', {
            incomes: this.incomes,
            expenses: this.allExpenses,
            percentage: this.percentageOfDeferred
          })
        }
      }
      this.expense = ''
      this.amount = ''
    }
  }
}
</script>

<style scoped lang="sass">
  .add-form
    margin-top: 20px
    display: flex
    padding: 5px
    width: 100%
    .input_expense
      width: 40%
    .select_expense
      width: 40%
      margin-left: 5px
      cursor: pointer
    .input_amount
      width: 20%
      margin-left: 5px
    .add-button
      margin-left: 5px
</style>
