<template>
  <div class="total_expenses-container">
    <table class="expenses_list">
      <tr v-for="(item, index) of totalSumOfExpenses" :key="item.id">
        <td>{{ index+1 }}</td>
        <td class="expenses_list-item">
          {{ item.expense }}
        </td>
        <td class="expenses_list-amount">
          {{ item.amount }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AllExpenses',
  computed: {
    ...mapGetters({
      totalSumOfExpenses: 'all-expenses/totalSumOfExpenses'
    })
  },
  methods: {
    ...mapActions({
      getTotalSumOfExpenses: 'all-expenses/getTotalSumOfExpenses'
    })
  },
  mounted () {
    this.getTotalSumOfExpenses()
  }
}
</script>

<style scoped lang="sass">
.total_expenses-container
  margin-top: 30px
  h5
    margin-left: 5px
    text-decoration: underline
  td
    padding: 5px
  .expenses_list
    width: 100%
    &-item
      width: 70%
    &-amount
      margin: 5px
</style>
