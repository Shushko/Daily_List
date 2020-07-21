<template>
  <div class="incomes_section">
    <h3>All incomes</h3>
    <table class="incomes_list">
      <tr v-for="(item, index) of incomes" :key="item.id" class="incomes_list-item">
        <td>{{ index+1 }}</td>
        <td>{{ item.source }}</td>
        <td class="incomes_list-item-amount">
          {{ item.amount }}
        </td>
        <td>
          <b-icon
            icon="trash-fill"
            font-scale="1"
            class="incomes_list-item-remove_btn"
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
      <span>Total</span>
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
.incomes_section
  width: 40%
  height: min-content
  padding: 10px
  border: 1px solid darkgray
  border-radius: 5px
  h3
    margin-left: 5px
    text-decoration: underline
  .incomes_list
    display: flex
    flex-direction: column
    margin-top: 30px
    width: 100%
    td
      padding: 5px
    &-item
      display: flex
      align-items: center
      transition: all 0.3s
      &:hover
        background: #E5E5E5
      &-amount
        margin-left: auto
      &-remove_btn
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
    display: flex
    margin: 20px 0 0 5px
    padding-top: 15px
    border-top: 1px solid darkgray
    font-weight: bold
    &-sum
      margin-left: auto
@media (max-width: 992px)
  .incomes_section
    width: 100%
</style>
