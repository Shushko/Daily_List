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
  margin-bottom: 100px
  .main-content
    margin-top: 30px
    margin-bottom: 100px
    display: flex
    justify-content: space-around
@media (max-width: 992px)
  .main-content
    flex-direction: column
</style>
