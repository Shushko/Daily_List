export const state = () => ({
  expenses: []
})

export const getters = {
  expenses: state => state.expenses
}

export const actions = {
  async getExpenses (ctx) {
    let allExpenses = []
    try {
      allExpenses = await this.$axios.$get('/expenses')
    } catch (e) {
      console.log(e)
    }
    ctx.commit('getExpenses', allExpenses)
  },
  async onRemoveItem (ctx, itemId) {
    await this.$axios.$delete(`/expenses/${itemId}`)
    ctx.commit('removeItem', itemId)
  },
  async onAddNewExpense (ctx, item) {
    const newItem = await this.$axios.$post('/expenses', item)
    ctx.commit('updateExpenses', newItem)
  }
}

export const mutations = {
  getExpenses (state, allExpenses) {
    state.expenses = allExpenses
  },
  updateExpenses (state, newItem) {
    state.expenses.push(newItem)
  },
  removeItem (state, itemId) {
    state.expenses = state.expenses.filter(n => n.id !== itemId)
  }
}
