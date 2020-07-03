export const state = () => ({
  statistics: [],
  expensesOfMonth: []
})

export const getters = {
  statistics: state => state.statistics,
  expensesOfMonth: state => state.expensesOfMonth
}

export const actions = {
  async getExpensesOfMonth (ctx, { valueYears, valueMonths }) {
    console.log(valueYears, valueMonths)
    const sortList = await this.$axios.$get('/previous-expenses', { params: { month: `${valueYears}-${valueMonths}` } })
    ctx.commit('showExpensesOfMonth', sortList)
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
