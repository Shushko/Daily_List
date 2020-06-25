<template>
  <div
    v-show="day <= $moment().format('YYYY-MM-DD')"
    class="main_budget-container"
  >
    <h3>Expenses:</h3>
    <div class="main_budget-content">
      <table>
        <tr v-for="(item, index) of todayExpenses" :key="item.id">
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
      todayExpenses: 'expenses/todayExpenses',
      day: 'search/getSelectedDate'
    })
  },
  methods: {
    ...mapActions({
      getTodayExpenses: 'expenses/getTodayExpenses'
    }),
    onRemoveItem (item) {
      this.$store.dispatch('expenses/onRemoveItem', item)
    }
  },
  mounted () {
    this.getTodayExpenses(this.$moment().format('YYYY-MM-DD'))
  }
}
</script>

<style scoped lang="sass">
  .main_budget-container
    width: 40%
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
</style>
