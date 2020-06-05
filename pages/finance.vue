<template>
  <div class="container">
    <IncomesSection />
    <ExpensesSection />
  </div>
</template>
<script>
import IncomesSection from '../components/Budget/Incomes/IncomesSection'
import ExpensesSection from '../components/Budget/Expenses/ExpensesSection'
export default {
  name: 'Finance',
  components: { ExpensesSection, IncomesSection }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
  margin-bottom: 100px
</style>
