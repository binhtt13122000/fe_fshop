<template>
  <div class="home">
    <div class="vue-template">
      <Layout></Layout>
      <!-- <HomePage></HomePage> -->
    </div>
  </div>
</template>

 <script>

 import Layout from '../components/Layout.vue'
// import HomePage from '../components/HomePage'
export default {
  name: 'Home',
  components: {
    // HomePage,
    Layout, 
  }
}
</script>
