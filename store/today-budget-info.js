export const state = () => ({
  todayBudget: null,
  percentageOfDeferred: null
})

export const getters = {
  todayBudget: state => state.todayBudget,
  percentageOfDeferred: state => state.percentageOfDeferred
}

export const actions = {
  async changeTodayBudget (ctx, { incomes, expenses, percentage }) {
    expenses = expenses.filter(n => n.date !== this.$moment().format('YYYY-MM-DD'))
    const inFinance = incomes.reduce((sum, n) => sum + Number(n.amount), 0)
    const outFinance = expenses.reduce((sum, n) => sum + Number(n.amount), 0)
    const currentTodayBudget = Math.round((inFinance - ((inFinance / 100) * percentage) - outFinance) / (this.$moment().daysInMonth() - this.$moment().date() + 1))
    await this.$axios.$patch('/today-budget', { sum: currentTodayBudget })
    ctx.commit('updTodayBudget', currentTodayBudget)
  },
  async getTodayBudget (ctx) {
    const currentBudget = await this.$axios.$get('/today-budget')
    ctx.commit('updTodayBudget', currentBudget.sum)
  },
  async getPercentage (ctx) {
    const percentage = await this.$axios.$get('/percentage-of-deferred')
    ctx.commit('updPercentageOfDeferred', percentage.percentage)
  },
  async changePercentage (ctx, value) {
    await this.$axios.$patch('/percentage-of-deferred', { percentage: value })
    ctx.commit('updPercentageOfDeferred', value)
  }
}

export const mutations = {
  updTodayBudget (state, value) {
    state.todayBudget = value
  },
  updPercentageOfDeferred (state, value) {
    state.percentageOfDeferred = value
  }
}
