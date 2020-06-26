export const state = () => ({
  totalSumOfExpenses: []
})

export const getters = {
  totalSumOfExpenses: state => state.totalSumOfExpenses
}

export const actions = {
  async getTotalSumOfExpenses (ctx) {
    let list = []
    try {
      list = await this.$axios.$get('/expenses')
    } catch (e) {
      console.log(e)
    }
    const totalExpensesList = []
    list.forEach((n, indexA) => {
      list.forEach((i, indexB) => {
        if (n.expense === i.expense && indexA < indexB) {
          n.amount = n.amount + i.amount
        }
      })
      const foundItem = totalExpensesList.find(item => item.expense === n.expense)
      if (!foundItem) {
        totalExpensesList.push(n)
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

    totalExpensesList.sort(compare)
    ctx.commit('showTotalSumOfExpenses', totalExpensesList)
  }
}

export const mutations = {
  showTotalSumOfExpenses (state, totalExpensesList) {
    state.totalSumOfExpenses = totalExpensesList
  }
}
