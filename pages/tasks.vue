<template>
  <div class="container">
    <div class="grey">
      <div class="box">
        <div class="yellow" />
        <div class="green" :style="{ display: isVisible ? 'block' : 'none' }" />
      </div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deleniti dicta distinctio doloremque, eaque id ipsa libero molestiae mollitia, nihil officia quasi repellat repudiandae tempore ullam. Corporis laborum odit qui ratione velit. Aliquid aperiam architecto commodi corporis doloribus ea impedit, mollitia natus necessitatibus, nesciunt quia rem ullam! Adipisci asperiores at aut, blanditiis esse laudantium natus, nobis perspiciatis quae quas quis saepe suscipit ullam. Ipsa labore molestias nobis quisquam, vel voluptatibus?
    </div>
    <button @click="isVisible = true">Show</button>
    <button @click="isVisible = false">Hide</button>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  data: () => ({
    isVisible: true
  })
}
</script>

<style scoped lang="sass">
.container
  margin-top: 100px
  .grey
    background: grey
    width: 500px
    height: 300px
    padding: 20px
    .box
      float: right
      display: flex
      flex-direction: column
      align-items: flex-end
      z-index: 9999
      .yellow
        float: right
        background: yellow
        height: 30px
        width: 150px
      .green
        position: absolute
        background: green
        margin-top: 40px
        height: 100px
        width: 250px
        border-radius: 5px
</style>
