<template>
  <div />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UpdateData',
  data: () => ({
    added: false
  }),
  computed: {
    ...mapGetters({
      todayExpenses: 'today-expenses/todayExpenses',
      expenses: 'all-expenses/expenses'
    })
  },
  mounted () {
    this.checkData()
  },
  methods: {
    async checkData () {
      const result = await this.$axios.$get('/current-data')
      const currentData = this.$moment().format('YYYY-MM-DD')
      if (result.data !== currentData) {
        await this.$axios.$patch('/current-data', { data: currentData })
        const sum = this.todayExpenses.reduce((sum, n) => sum + Number(n.amount), 0)
        await this.$axios.$post('/previous_today_expenses', {
          data: this.$moment().format('YYYY-MM-DD'),
          total: sum,
          today_expenses: this.todayExpenses
        })
        for (const i of this.todayExpenses) {
          for (const n of this.expenses) {
            if (i.expense === n.expense) {
              this.added = true
              const sum = i.amount + n.amount
              await this.$store.dispatch('all-expenses/onAddExpense', { itemId: n.id, value: sum })
            }
          }
          if (this.added === false) {
            await this.$store.dispatch('all-expenses/onAddNewExpense', {
              expense: i.expense,
              amount: i.amount
            })
          }
          this.added = false
          await this.$store.dispatch('today-expenses/onRemoveItem', i.id)
        }
      }
    }
  }
}
</script>
