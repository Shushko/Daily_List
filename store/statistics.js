export const state = () => ({
  statistics: [],
  expensesOfMonth: []
})

export const getters = {
  statistics: state => state.statistics,
  expensesOfMonth: state => state.expensesOfMonth
}

export const actions = {
  async getExpensesOfMonth (ctx, date = {
    valueYears: new Date().getFullYear(),
    valueMonths: new Date().getMonth()
  }) {
    const sortList = await this.$axios.$get('/previous-expenses', { params: { month: `${date.valueYears}-${date.valueMonths}` } })
    ctx.commit('showExpensesOfMonth', sortList[0])
  },
  async addPreviousMonth (ctx, month) {
    const previousMonth = await this.$axios.$post('/previous-expenses', month)
    ctx.commit('addInStatistics', previousMonth)
  }
}

export const mutations = {
  showExpensesOfMonth (state, sortList) {
    state.expensesOfMonth = sortList
  },
  addInStatistics (state, previousMonth) {
    state.statistics.push(previousMonth)
  }
}
