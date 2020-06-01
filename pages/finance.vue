<template>
  <div class="container">
    <IncomesSection :incomes="incomes" />
    <ExpensesSection />
  </div>
</template>
<script>
import IncomesSection from '../components/IncomesSection'
import ExpensesSection from '../components/Epenses/ExpensesSection'
export default {
  name: 'Finance',
  components: { ExpensesSection, IncomesSection },
  async asyncData ({ $axios }) {
    let incomes = []
    try {
      incomes = await $axios.$get('/incomes')
    } catch (e) {
      console.log(e)
    }
    return { incomes }
  }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
  margin-bottom: 100px
</style>
