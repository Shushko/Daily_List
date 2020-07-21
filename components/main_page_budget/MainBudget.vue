<template>
  <div
    v-show="day <= $moment().format('YYYY-MM-DD')"
    class="main_budget_container"
  >
    <h3>Expenses:</h3>
    <table class="main_budget_list">
      <tr
        v-for="(item, index) of expensesOfDay"
        :key="item.id"
        class="main_budget_list-item"
      >
        <td>{{ index+1 }}</td>
        <td>{{ item.expense }}</td>
        <td class="main_budget_list-item-amount">
          {{ item.amount }}
        </td>
        <td>
          <b-icon
            icon="trash-fill"
            font-scale="1"
            class="main_budget_list-item-remove_btn"
            @click="onRemoveItem(item)"
          />
        </td>
      </tr>
    </table>
    <FormForAdd />
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
.main_budget_container
  width: 45%
  height: min-content
  padding: 10px
  border: 1px solid darkgray
  border-radius: 5px
  h3
    margin-left: 5px
    text-decoration: underline
  .main_budget_list
    display: flex
    flex-direction: column
    margin-top: 30px
    width: 100%
    td
      padding: 7px
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
@media (max-width: 992px)
  .main_budget_container
    margin-top: 30px
    width: 100%
</style>
