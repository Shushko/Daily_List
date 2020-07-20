<template>
  <div class="incomes_box">
    <h3>All incomes</h3>
    <table class="incomes_box-list">
      <tr v-for="(item, index) of incomes" :key="item.id">
        <td>
          {{ index+1 }}
        </td>
        <td class="incomes_box-list-item">
          {{ item.source }}
        </td>
        <td class="incomes_box-list-amount">
          {{ item.amount }}
        </td>
        <td>
          <b-icon
            icon="trash-fill"
            font-scale="1"
            class="incomes_box-list-remove_btn"
            @click="onRemoveItem(item.id)"
          />
        </td>
      </tr>
    </table>
    <form class="add_form" @submit.prevent="onAddNewSource">
      <input
        v-model="source"
        type="text"
        placeholder="Source..."
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
      <button class="btn btn-sm btn-outline-primary add_form-add_button">
        <b-icon
          icon="plus"
          font-scale="1.8"
          type="submit"
        />
      </button>
    </form>
    <div class="total_item">
      Total
      <span class="total_item-sum">{{ getTotal }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IncomesSection',
  data: () => ({
    source: null,
    amount: null
  }),
  computed: {
    ...mapGetters({
      incomes: 'budget/incomes',
      allExpenses: 'expenses/allExpenses',
      percentageOfDeferred: 'today-budget-info/percentageOfDeferred'
    }),
    getTotal () {
      return this.incomes.reduce((sum, n) => sum + Number(n.amount), 0)
    }
  },
  mounted () {
    this.getIncomes()
  },
  methods: {
    ...mapActions({
      getIncomes: 'budget/getIncomes'
    }),
    async onRemoveItem (itemId) {
      await this.$store.dispatch('budget/onRemoveItem', itemId)
      await this.$store.dispatch('today-budget-info/changeTodayBudget', {
        incomes: this.incomes,
        expenses: this.allExpenses,
        percentage: this.percentageOfDeferred
      })
    },
    async onAddNewSource () {
      if (this.source && this.amount) {
        await this.$store.dispatch('budget/onAddNewSource', {
          source: this.source,
          amount: Math.round(this.amount)
        })
        await this.$store.dispatch('today-budget-info/changeTodayBudget', {
          incomes: this.incomes,
          expenses: this.allExpenses,
          percentage: this.percentageOfDeferred
        })
      }
      this.source = ''
      this.amount = ''
    }
  }
}
</script>

<style scoped lang="sass">
.incomes_box
  width: 40%
  height: min-content
  padding: 10px
  border: 1px solid darkgray
  border-radius: 5px
  h3
    margin-left: 5px
    text-decoration: underline
  &-list
    margin-top: 30px
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
      float: right
    &-remove_btn
      float: right
      cursor: pointer
      transition: all 0.3s
      &:hover
        color: indianred
  .add_form
    margin-top: 20px
    display: flex
    padding: 5px
    width: 100%
    input
      width: 40%
      margin-left: 10px
      &:first-child
        margin-left: 0px
    &-add_button
      margin-left: auto
  .total_item
    margin-left: 5px
    margin-top: 20px
    padding-top: 15px
    border-top: 1px solid darkgray
    font-weight: bold
    &-sum
      float: right
      margin-right: 5px
</style>
