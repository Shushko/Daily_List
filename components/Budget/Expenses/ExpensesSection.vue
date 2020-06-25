<template>
  <div class="expenses-box">
    <h3>All expenses</h3>
    <AllExpenses />
  </div>
</template>

<script>
import AllExpenses from './AllExpenses'
export default {
  name: 'ExpensesSection',
  components: { AllExpenses }
}
</script>

<style scoped lang="sass">
.expenses-box
  width: 40%
  height: min-content
  padding: 10px
  border: 1px solid darkgray
  border-radius: 5px
  h3
    margin-left: 5px
    text-decoration: underline
</style>
