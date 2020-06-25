export const state = () => ({
  selectedDate: null
})

export const getters = {
  getSelectedDate: state => state.selectedDate
}

export const mutations = {
  changeSelectedDate (state, newDate) {
    state.selectedDate = newDate
  }
}
