<template>
  <div class="container">
    <InfoHeader />
    <div class="main-content">
      <IncomesSection />
      <ExpensesSection />
    </div>
  </div>
</template>
<script>
import InfoHeader from '../components/Budget/InfoHeader'
import IncomesSection from '../components/Budget/Incomes/IncomesSection'
import ExpensesSection from '../components/Budget/Expenses/ExpensesSection'
export default {
  name: 'Finance',
  components: { InfoHeader, ExpensesSection, IncomesSection }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
  .main-content
    margin-top: 40px
    margin-bottom: 100px
    display: flex
    justify-content: space-around
</style>
