<template>
  <div class="expenses-box">
    <h3>Expenses</h3>
  </div>
</template>

<script>
export default {
  name: 'ExpensesSection',
  props: {
    exspenses: {
      type: Array
    }
  }
}
</script>

<style scoped lang="sass">
.expenses-box
  margin-top: 30px
  width: 40%
  padding: 10px
  border: 1px solid darkgray
  border-radius: 5px
  h3
  text-decoration: underline
</style>
