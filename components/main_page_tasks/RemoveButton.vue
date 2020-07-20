<template>
  <b-icon
    icon="trash-fill"
    font-scale="1"
    class="rmv-button"
    @click="onRemoveTask(item.id)"
  />
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
.rmv-button
  cursor: pointer
  transition: all 0.3s
.rmv-button:hover
  color: indianred
</style>
