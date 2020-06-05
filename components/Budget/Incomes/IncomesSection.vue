<template>
  <div class="incomes-box">
    <h3>Incomes</h3>
    <table class="incomes-list">
      <tr v-for="(item, index) of incomes" :key="item.id">
        <td>
          {{ index+1 }}
        </td>
        <td class="item-of-list">
          {{ item.source }}
        </td>
        <td class="amount-item">
          {{ item.amount }}
        </td>
        <td>
          <batton class="btn btn-sm btn-outline-danger remove-item" @click="onRemoveItem(item.id)">
            Remove
          </batton>
        </td>
      </tr>
    </table>
    <form class="add-source" @submit="onAddNewSource">
      <input v-model="source" type="text" placeholder="Source...">
      <input v-model="amount" type="text" placeholder="Amount...">
      <button class="btn btn-sm btn-outline-primary add-button" type="submit">
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
  name: 'IncomesSection',
  data: () => ({
    source: '',
    amount: ''
  }),
  computed: {
    ...mapGetters({
      incomes: 'budget/incomes'
    }),
    getTotal () {
      return this.incomes.reduce((sum, n) => sum + Number(n.amount), 0)
    }
  },
  methods: {
    ...mapActions({
      getIncomes: 'budget/getIncomes'
    }),
    onRemoveItem (itemId) {
      this.$store.dispatch('budget/onRemoveItem', itemId)
    },
    onAddNewSource () {
      this.$store.dispatch('budget/onAddNewSource', {
        source: this.source,
        amount: this.amount
      })
    }
  },
  mounted () {
    this.getIncomes()
  }
}
</script>

<style scoped lang="sass">
.incomes-box
  width: 40%
  padding: 10px
  border: 1px solid darkgray
  border-radius: 5px
  h3
    margin-left: 5px
    text-decoration: underline
  td
    padding: 5px
  .item-of-list
    width: 60%
  .incomes-list
    width: 100%
  .amount-item
    margin: 5px
    float: right
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
  .add-source
    margin-top: 20px
    display: flex
    padding: 5px
    width: 100%
    input
      margin-left: 20px
      width: 35%
  .add-button
    margin-left: auto
</style>
