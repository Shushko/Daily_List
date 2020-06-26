export const state = () => ({
  expensesOfDay: [],
  currentExpensesList: [],
  allExpenses: []
})

export const getters = {
  expensesOfDay: state => state.expensesOfDay,
  currentExpensesList: state => state.currentExpensesList,
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
    const currentExpensesList = list.filter(n => n.date === this.$moment().format('YYYY-MM-DD'))
    ctx.commit('showCurrentExpensesList', currentExpensesList)
  },
  async getExpensesOfDay (ctx, day) {
    let expensesList = []
    try {
      expensesList = await this.$axios.$get('/expenses', { params: { date: day } })
    } catch (e) {
      console.log(e)
    }
    ctx.commit('showExpensesOfDay', expensesList)
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
  showExpensesOfDay (state, expensesList) {
    state.expensesOfDay = expensesList
  },
  showCurrentExpensesList (state, currentExpensesList) {
    state.currentExpensesList = currentExpensesList
  },
  showAllExpenses (state, allExpenses) {
    state.allExpenses = allExpenses
  },
  updateExpenses (state, newItem) {
    state.expensesOfDay.push(newItem)
    state.allExpenses.push(newItem)
    if (newItem.date === this.$moment().format('YYYY-MM-DD')) {
      state.currentExpensesList.push(newItem)
    }
  },
  changeValue (state, newItem) {
    const ind = state.expensesOfDay.findIndex(n => n.id === newItem.id)
    state.expensesOfDay.splice(ind, 1, newItem)
    const indItem = state.allExpenses.findIndex(n => n.id === newItem.id)
    state.allExpenses.splice(indItem, 1, newItem)
    if (newItem.date === this.$moment().format('YYYY-MM-DD')) {
      state.currentExpensesList.splice(ind, 1, newItem)
    }
  },
  removeItem (state, item) {
    state.expensesOfDay = state.expensesOfDay.filter(n => n.id !== item.id)
    state.allExpenses = state.allExpenses.filter(n => n.id !== item.id)
    if (item.date === this.$moment().format('YYYY-MM-DD')) {
      state.currentExpensesList = state.currentExpensesList.filter(n => n.id !== item.id)
    }
  }
}
