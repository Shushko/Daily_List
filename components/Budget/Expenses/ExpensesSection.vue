<template>
  <div class="expenses_section">
    <h3>All expenses</h3>
    <table class="expenses_list">
      <tr v-for="(item, index) of totalSumOfExpenses" :key="item.id" class="expenses_list-item">
        <td>{{ index+1 }}</td>
        <td>{{ item.expense }}</td>
        <td class="expenses_list-item-amount">
          {{ item.amount }}
        </td>
      </tr>
    </table>
    <div class="total_item">
      <span>Total</span>
      <span class="total_item-sum">{{ getTotal }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ExpensesSection',
  computed: {
    ...mapGetters({
      totalSumOfExpenses: 'all-expenses/totalSumOfExpenses'
    }),
    getTotal () {
      return this.totalSumOfExpenses.reduce((sum, n) => sum + Number(n.amount), 0)
    }
  },
  mounted () {
    this.getTotalSumOfExpenses()
  },
  methods: {
    ...mapActions({
      getTotalSumOfExpenses: 'all-expenses/getTotalSumOfExpenses'
    })
  }
}
</script>

<style scoped lang="sass">
.expenses_section
  width: 40%
  height: min-content
  padding: 10px
  border: 1px solid darkgray
  border-radius: 5px
  h3
    margin-left: 5px
    text-decoration: underline
  .expenses_list
    display: flex
    flex-direction: column
    margin-top: 30px
    width: 100%
    td
      padding: 5px
    &-item
      display: flex
      &-amount
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
  .expenses_section
    margin-top: 30px
    width: 100%
</style>
