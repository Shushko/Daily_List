export const state = () => ({
  tasks: []
})

export const getters = {
  todos: state => state.tasks
}

export const actions = {
  async getTasks ({ commit }) {
    let todos = []
    try {
      todos = await this.$axios.$get('/tasks')
    } catch (e) {
      console.log(e)
    }
    commit('loadTodos', todos)
  },
  async onChangeStatus (ctx, item) {
    if (!item.done) {
      await this.$axios.$patch(`/tasks/${item.id}`, { done: true })
    } else {
      await this.$axios.$patch(`/tasks/${item.id}`, { done: false })
    }
    const updatedItems = await this.$axios.$get('/tasks')
    ctx.commit('updateList', updatedItems)
  },
  async onRemoveTask (ctx, itemId) {
    await this.$axios.delete(`/tasks/${itemId}`)
    ctx.commit('removeItem', itemId)
  },
  async onAddTodo (ctx, todo) {
    await this.$axios.$post('/tasks', todo)
  },
  async changeItemTodo (ctx, { itemId, value }) {
    await this.$axios.$patch(`/tasks/${itemId}`, { todo: value })
    const updatedItems = await this.$axios.$get('/tasks')
    ctx.commit('updateList', updatedItems)
  }
}

export const mutations = {
  loadTodos (state, todos) {
    state.tasks = todos
  },
  removeItem (state, itemId) {
    state.tasks = state.tasks.filter(n => n.id !== itemId)
  },
  updateList (state, updatedItems) {
    state.tasks = updatedItems
  }
}
