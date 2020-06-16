export const state = () => ({
  allList: []
})

export const getters = {
  showAllList: state => state.allList
}

export const actions = {
  async getList (ctx) {
    let allList = []
    try {
      allList = await this.$axios.$get('/previous_today_expenses')
    } catch (e) {
      console.log(e)
    }
    ctx.commit('updAllList', allList)
  },
  async getItem ({ params, commit }, { dataItem }) {
    let itemList = []
    try {
      itemList = await this.$axios.$get('/previous_today_expenses', { params: { data: dataItem } })
    } catch (e) {
      console.log(e)
    }
    commit('updAllList', itemList)
  }
}

export const mutations = {
  updAllList (state, list) {
    state.allList = list
  }
}
