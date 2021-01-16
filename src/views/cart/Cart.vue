<template>
  <div>
    <v-container>
      <div>
        <v-row>
            <h1>Oke ne</h1>
            <v-col v-for="car in cars" :key="car.cartId">
                <h1>Oke ln</h1>
                <h1>{{cart.cartDescription}}</h1>
                 <h1>{{cart.cartTotal}}</h1>
            </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "product",
  props: ["product","cart"],
};
</script>

<style lang="scss">
</style>