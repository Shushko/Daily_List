<template>
  <div class="all-expenses-container">
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
    <FormForAdd :name-for-request="'all-expenses'" :list-with-values="expenses" />
    <div class="total-item">
      Total
      <span class="total-sum">{{ getTotal }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormForAdd from '../FormForAdd'
export default {
  name: 'AllExpenses',
  components: { FormForAdd },
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
    }
  },
  mounted () {
    this.getExpenses()
  }
}
</script>

<style scoped lang="sass">
.all-expenses-container
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
