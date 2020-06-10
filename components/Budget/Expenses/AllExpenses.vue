<template>
  <div class="all-expenses">
    <table class="expenses-list">
      <tr v-for="(item, index) of expenses" :key="item.id">
        <td>{{ index+1 }}</td>
        <td class="item-of-list">
          {{ item.expense }}
        </td>
        <td class="amount-item">
          {{ item.amount }}
        </td>
        <td>
          <button class="btn btn-sm btn-outline-danger remove-item" @click="onRemoveItem(item.id)">
            Remove
          </button>
        </td>
      </tr>
    </table>
    <form class="add-expense">
      <input
        v-model="expense"
        type="text"
        placeholder="Expense..."
        required
        title="Use only charters!"
        pattern="^[a-zA-Z\s]+$"
      >
      <input
        v-model="amount"
        type="text"
        placeholder="Amount..."
        title="Use only numbers!"
        required
        pattern="^[0-9]+$"
      >
      <button class="btn btn-sm btn-outline-primary add-button" type="submit" @click.prevent="onAddNewExpense()">
        Add
      </button>
    </form>
    <div class="total-item">
      Total
      <span class="total-sum">{{ getTotal }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AllExpenses',
  data: () => ({
    expense: null,
    amount: null
  }),
  computed: {
    ...mapGetters({
      expenses: 'all-expenses/expenses'
    }),
    getTotal () {
      return this.expenses.reduce((sum, n) => sum + Number(n.amount), 0)
    }
  },
  methods: {
    ...mapActions({
      getExpenses: 'all-expenses/getExpenses'
    }),
    onRemoveItem (itemId) {
      this.$store.dispatch('all-expenses/onRemoveItem', itemId)
    },
    onAddNewExpense () {
      if (this.expense && this.amount) {
        this.$store.dispatch('all-expenses/onAddNewExpense', {
          expense: this.expense,
          amount: Math.round(this.amount)
        })
      }
      this.expense = ''
      this.amount = ''
    }
  },
  mounted () {
    this.getExpenses()
  }
}
</script>

<style scoped lang="sass">
.all-expenses
  margin-top: 30px
  h5
    margin-left: 5px
    text-decoration: underline
  td
    padding: 5px
  .expenses-list
    width: 100%
  .item-of-list
    width: 60%
  .amount-item
    float: right
    margin: 5px
  .remove-item
    float: right
  .add-expense
    margin-top: 20px
    display: flex
    padding: 5px
    width: 100%
    input
      margin-left: 20px
      width: 35%
  .add-button
    margin-left: auto
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
