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
      const currentData = this.$moment().format('LT')
      if (result.data !== currentData) {
        await this.$axios.$patch('/current-data', { data: currentData })
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
