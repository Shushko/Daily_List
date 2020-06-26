export const state = () => ({
  todayBudget: null
})

export const getters = {
  todayBudget: state => state.todayBudget
}

export const actions = {
  async changeTodayBudget (ctx, { incomes, expenses }) {
    const inFinance = incomes.reduce((sum, n) => sum + Number(n.amount), 0)
    const outFinance = expenses.reduce((sum, n) => sum + Number(n.amount), 0)
    const currentTodayBudget = Math.round((inFinance - (inFinance / 10) - outFinance) / (this.$moment().daysInMonth() - this.$moment().date() + 1))
    await this.$axios.$patch('/today-budget', { sum: currentTodayBudget })
    ctx.commit('updTodayBudget', currentTodayBudget)
  },
  async getTodayBudget (ctx) {
    const currentBudget = await this.$axios.$get('/today-budget')
    ctx.commit('updTodayBudget', currentBudget.sum)
  }
}

export const mutations = {
  updTodayBudget (state, value) {
    state.todayBudget = value
  }
}
