export const state = () => ({
  tasks: []
})

export const getters = {
  todos: state => state.tasks
}

export const actions = {
  async getTasks (ctx, day) {
    let todos = []
    try {
      todos = await this.$axios.$get('/tasks', { params: { data: day } })
    } catch (e) {
      console.log(e)
    }
    ctx.commit('loadTodos', todos)
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
    const newTodo = await this.$axios.$post('/tasks', todo)
    ctx.commit('addNewTodo', newTodo)
  },
  async changeItemTodo (ctx, { itemId, value }) {
    const updatedItem = await this.$axios.$patch(`/tasks/${itemId}`, { todo: value })
    ctx.commit('updateList', updatedItem)
  }
}

export const mutations = {
  loadTodos (state, todos) {
    state.tasks = todos
  },
  addNewTodo (state, newTodo) {
    state.tasks.push(newTodo)
  },
  removeItem (state, itemId) {
    state.tasks = state.tasks.filter(n => n.id !== itemId)
  },
  updateList (state, updatedItem) {
    const itemIndex = state.tasks.findIndex(n => n.id === updatedItem.id)
    state.tasks.splice(itemIndex, 1, updatedItem)
  }
}
