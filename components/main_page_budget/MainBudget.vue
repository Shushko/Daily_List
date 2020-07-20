<template>
  <div
    v-show="day <= $moment().format('YYYY-MM-DD')"
    class="main_budget-container"
  >
    <h3>Expenses:</h3>
    <div class="main_budget-content">
      <table>
        <tr v-for="(item, index) of expensesOfDay" :key="item.id">
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
              class="remove-item"
              @click="onRemoveItem(item)"
            />
          </td>
        </tr>
      </table>
      <FormForAdd />
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
      day: 'search/getSelectedDate',
      incomes: 'budget/incomes',
      allExpenses: 'expenses/allExpenses',
      percentageOfDeferred: 'today-budget-info/percentageOfDeferred'
    }),
    expensesOfDay () {
      return this.allExpenses.filter(n => n.date === this.day)
    }
  },
  mounted () {
    this.getAllExpenses()
  },
  methods: {
    ...mapActions({
      getAllExpenses: 'expenses/getAllExpenses'
    }),
    async onRemoveItem (item) {
      await this.$store.dispatch('expenses/onRemoveItem', item)
      if (item.date !== this.$moment().format('YYYY-MM-DD')) {
        await this.$store.dispatch('today-budget-info/changeTodayBudget', {
          incomes: this.incomes,
          expenses: this.allExpenses,
          percentage: this.percentageOfDeferred
        })
      }
    }
  }
}
</script>

<style scoped lang="sass">
  .main_budget-container
    width: 45%
    height: min-content
    padding: 20px
    border: 1px solid darkgray
    border-radius: 4px
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
  @media (max-width: 992px)
    .main_budget-container
      margin-top: 20px
      width: 100%
</style>
