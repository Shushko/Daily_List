export const state = () => ({
  currentData: null
})

export const getters = {
  getData: state => state.currentData
}

export const actions = {
  async updData (ctx, newData) {
    await this.$axios.$patch('/current-data', { data: newData })
    ctx.commit('changeData', newData)
  }
}

export const mutations = {
  changeData (state, newData) {
    state.currentData = newData
  }
}
