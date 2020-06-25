export const state = () => ({
  incomes: [],
  todayBudget: ''
})

export const getters = {
  incomes: state => state.incomes,
  todayBudget: state => state.todayBudget
}

export const actions = {
  async getIncomes ({ commit }) {
    let incomes = []
    try {
      incomes = await this.$axios.$get('/incomes')
    } catch (e) {
      console.log(e)
    }
    commit('getIncomes', incomes)
  },
  async onRemoveItem (ctx, itemId) {
    await this.$axios.$delete(`/incomes/${itemId}`)
    const updList = await this.$axios.$get('/incomes')
    ctx.commit('updateIncomesList', updList)
  },
  async onAddNewSource (ctx, newSource) {
    const newItem = await this.$axios.$post('/incomes', newSource)
    ctx.commit('addNewItem', newItem)
  },
  async changeTodayBudget (ctx, value) {
    await this.$axios.$patch('/today-budget', { sum: value })
    ctx.commit('updTodayBudget', value)
  },
  async getTodayBudget (ctx) {
    const currentBudget = await this.$axios.$patch('/today-budget')
    ctx.commit('updTodayBudget', currentBudget.sum)
  }
}

export const mutations = {
  getIncomes (state, incomes) {
    state.incomes = incomes
  },
  updateIncomesList (state, updList) {
    state.incomes = updList
  },
  addNewItem (state, newItem) {
    state.incomes.push(newItem)
  },
  updTodayBudget (state, value) {
    state.todayBudget = value
  }
}
