export const state = () => ({
  todayExpenses: [],
  allExpenses: [],
  currentExpensesList: []
})

export const getters = {
  todayExpenses: state => state.todayExpenses,
  allExpenses: state => state.allExpenses,
  currentExpensesList: state => state.currentExpensesList
}

export const actions = {
  async getAllExpenses (ctx) {
    let list = []
    try {
      list = await this.$axios.$get('/today_expenses')
    } catch (e) {
      console.log(e)
    }
    const allExpensesList = []
    list.forEach((n, indexA) => {
      list.forEach((i, indexB) => {
        if (n.expense === i.expense && indexA < indexB) {
          n.amount = n.amount + i.amount
        }
      })
      const foundItem = allExpensesList.find(item => item.expense === n.expense)
      if (!foundItem) {
        allExpensesList.push(n)
      }
    })
    function compare (a, b) {
      const valueA = a.amount
      const valueB = b.amount
      let comparison = 0
      if (valueA > valueB) {
        comparison = -1
      } else if (valueA < valueB) {
        comparison = 1
      }
      return comparison
    }
    allExpensesList.sort(compare)
    const currentExpensesList = list.filter(n => n.date === this.$moment().format('YYYY-MM-DD'))
    ctx.commit('showAllExpensesList', allExpensesList)
    ctx.commit('showCurrentExpensesList', currentExpensesList)
  },
  async getTodayExpenses (ctx, day) {
    let todayExpensesList = []
    try {
      todayExpensesList = await this.$axios.$get('/today_expenses', { params: { date: day } })
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
  async onRemoveItem (ctx, item) {
    await this.$axios.$delete(`/today_expenses/${item.id}`)
    ctx.commit('removeItem', item)
  }
}

export const mutations = {
  showAllExpensesList (state, allExpensesList) {
    state.allExpenses = allExpensesList
  },
  showTodayExpensesList (state, todayExpensesList) {
    state.todayExpenses = todayExpensesList
  },
  showCurrentExpensesList (state, currentExpensesList) {
    state.currentExpensesList = currentExpensesList
  },
  updateExpenses (state, newItem) {
    state.todayExpenses.push(newItem)
    if (newItem.date === this.$moment().format('YYYY-MM-DD')) {
      state.currentExpensesList.push(newItem)
    }
  },
  changeValue (state, newItem) {
    const ind = state.todayExpenses.findIndex(n => n.id === newItem.id)
    state.todayExpenses.splice(ind, 1, newItem)
    if (newItem.date === this.$moment().format('YYYY-MM-DD')) {
      state.currentExpensesList.splice(ind, 1, newItem)
    }
  },
  removeItem (state, item) {
    state.todayExpenses = state.todayExpenses.filter(n => n.id !== item.id)
    state.allExpenses = state.allExpenses.filter(n => n.id !== item.id)
    if (item.date === this.$moment().format('YYYY-MM-DD')) {
      state.currentExpensesList = state.currentExpensesList.filter(n => n.id !== item.id)
    }
  }
}
