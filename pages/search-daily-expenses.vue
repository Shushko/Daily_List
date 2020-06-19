<template>
  <div class="container">
    <form @submit.prevent="onSearchPreviousExpenses">
      <b-form-datepicker
        v-model="value"
        :date-format-options="{ day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' }"
        class="mb-2"
        placeholder="Click to search... (YYYY/MM/DD)"
      />
      <button class="btn btn-info search-button" type="submit">
        Search
      </button>
    </form>
    <div class="content">
      <div v-for="day of allList" :key="day.id" class="content-list">
        <span class="content-list-title">{{ day.data }}</span>
        <table>
          <tr v-for="(item, index) of day.today_expenses" :key="item.id">
            <td class="content-list-item">
              {{ index+1 }}
            </td>
            <td class="content-list-expense">
              {{ item.expense }}
            </td>
            <td class="content-list-amount">
              {{ item.amount }}
            </td>
          </tr>
        </table>
        <div class="content-list-total">
          Total:
          <div class="content-list-total-sum">
            {{ day.total }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SearchDailyExpenses',
  data: () => ({
    time1: null,
    value: '',
    searchTimeout: null
  }),
  computed: {
    ...mapGetters({
      allList: 'search-daily-expenses/showAllList'
    })
  },
  methods: {
    ...mapActions({
      getAllList: 'search-daily-expenses/getList'
    }),
    onSearchPreviousExpenses () {
      this.$store.dispatch('search-daily-expenses/getItem', { dataItem: this.value })
    }
  },
  // watch: {
  //   value (newValue) {
  //     clearTimeout(this.searchTimeout)
  //     this.searchTimeout = setTimeout(() => {
  //       if (newValue.length < 10) {
  //         this.$store.dispatch('search-daily-expenses/getList')
  //       }
  //     }, 1000)
  //   }
  // },
  mounted () {
    this.getAllList()
  }
}
</script>

<style scoped lang="sass">
.container
  margin-top: 90px
  .search-button
    margin-top: 15px
    width: 100%
  .content
    width: 100%
    margin-bottom: 100px
    display: flex
    flex-wrap: wrap
    justify-content: space-around
  .content-list
    width: 40%
    margin-top: 40px
    padding: 30px
    border: 1px solid darkgray
    border-radius: 4px
    table
      width: 100%
      margin-top: 20px
    td
      padding: 10px
    &-title
      margin-top: 30px
      font-weight: bold
      font-size: 20px
      border-bottom: 1px solid black
    &-item
      width: 10%
    &-expense
      width: 60%
    &-amount
      float: right
    &-total
      border-top: 1px solid black
      font-weight: bold
      padding: 10px
      &-sum
        float: right
</style>
