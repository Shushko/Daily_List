<template>
  <button class="btn btn-sm btn-outline-danger" @click="onRemoveTask(item.id)">
    Remove
  </button>
</template>

<script>
export default {
  name: 'RemoveButton',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    onRemoveTask (itemId) {
      this.$store.dispatch('tasks/onRemoveTask', itemId)
    }
  }
}
</script>

<style scoped lang="sass">
</style>
