<template>
  <form class="add-form" @submit.prevent="onAddNewExpense">
    <input
      v-model="expense"
      class="form-control"
      type="text"
      placeholder="Expense..."
      title="Use only charters!"
      required
      pattern="^[a-zA-Z\s]+$"
    >
    <input
      v-model="amount"
      class="form-control"
      type="text"
      placeholder="Amount..."
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
    amount: null
  }),
  computed: {
    ...mapGetters({
      allExpenses: 'expenses/allExpenses',
      todayExpenses: 'expenses/todayExpenses',
      day: 'search/getSelectedDate'
    })
  },
  methods: {
    onAddNewExpense () {
      if (this.expense && this.amount) {
        const newItem = this.todayExpenses.find(n => n.expense === this.expense)
        if (newItem) {
          this.$store.dispatch('expenses/onAddExpense', {
            itemId: newItem.id,
            value: Math.round(this.amount) + Number(newItem.amount)
          })
        } else {
          this.$store.dispatch('expenses/onAddNewExpense', {
            date: this.day,
            expense: this.expense,
            amount: Math.round(this.amount)
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

    input
      width: 40%
      margin-left: 10px

      &:first-child
        margin-left: 0px

    .add-button
      margin-left: auto
</style>
