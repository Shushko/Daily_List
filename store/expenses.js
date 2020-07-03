export const state = () => ({
  allExpenses: []
})

export const getters = {
  allExpenses: state => state.allExpenses
}

export const actions = {
  async getAllExpenses (ctx) {
    let list = []
    try {
      list = await this.$axios.$get('/expenses')
    } catch (e) {
      console.log(e)
    }
    ctx.commit('showAllExpenses', list)
  },
  async onAddNewExpense (ctx, item) {
    const newItem = await this.$axios.$post('/expenses', item)
    ctx.commit('updateExpenses', newItem)
  },
  async onAddExpense (ctx, { itemId, value }) {
    const newItem = await this.$axios.$patch(`/expenses/${itemId}`, { amount: value })
    ctx.commit('changeValue', newItem)
  },
  async onRemoveItem (ctx, item) {
    await this.$axios.$delete(`/expenses/${item.id}`)
    ctx.commit('removeItem', item)
  }
}

export const mutations = {
  showAllExpenses (state, allExpenses) {
    state.allExpenses = allExpenses
  },
  updateExpenses (state, newItem) {
    state.allExpenses.push(newItem)
  },
  changeValue (state, newItem) {
    const indItem = state.allExpenses.findIndex(n => n.id === newItem.id)
    state.allExpenses.splice(indItem, 1, newItem)
  },
  removeItem (state, item) {
    state.allExpenses = state.allExpenses.filter(n => n.id !== item.id)
  }
}
