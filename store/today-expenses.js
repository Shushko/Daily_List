export const state = () => ({
  todayExpenses: []
})

export const getters = {
  todayExpenses: state => state.todayExpenses
}

export const actions = {
  async getTodayExpenses (ctx, day) {
    let todayExpensesList = []
    try {
      todayExpensesList = await this.$axios.$get('/today_expenses', { params: { data: day } })
    } catch (e) {
      console.log(e)
    }
    ctx.commit('showTodayExpensesList', todayExpensesList)
  },
  async onAddNewExpense (ctx, item) {
    const newItem = await this.$axios.$post('/today_expenses', item)
    ctx.commit('updateExpenses', newItem)
  },
  async onAddExpense (ctx, { itemId, value }) {
    const newItem = await this.$axios.$patch(`/today_expenses/${itemId}`, { amount: value })
    ctx.commit('changeValue', newItem)
  },
  async onRemoveItem (ctx, itemId) {
    await this.$axios.$delete(`/today_expenses/${itemId}`)
    ctx.commit('removeItem', itemId)
  }
}

export const mutations = {
  showTodayExpensesList (state, todayExpensesList) {
    state.todayExpenses = todayExpensesList
  },
  updateExpenses (state, newItem) {
    state.todayExpenses.push(newItem)
  },
  changeValue (state, newItem) {
    const ind = state.todayExpenses.findIndex(n => n.id === newItem.id)
    state.todayExpenses.splice(ind, 1, newItem)
  },
  removeItem (state, itemId) {
    state.todayExpenses = state.todayExpenses.filter(n => n.id !== itemId)
  }
}
