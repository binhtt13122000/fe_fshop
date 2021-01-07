<template>
  <!-- <div class="card mb-4 shadow-sm">
    <v-img class="img-responsive" src="https://s3.cloud.cmctelecom.vn/vfc.website.images/2009036/2009036_WHITE_1.jpg" width="60%"/> -->
  <!-- <img :src="product.productImages.imgUrl" class="card-img-top product-image" /> -->
  <!-- <div class="card-body">
      <h4 class="card-title text-left">{{ product.productName }}</h4>
      <h4 class="card-title text-left">{{ product.productPrice }} đ</h4>
      <div class="row">
        <router-link
          type="button"
          class="btn btn-primary btn-lg"
          :to="'/details/' + product.id"
        >Details</router-link>
      </div>
    </div>
  </div> -->
  <div>
    <v-card>
      <div class="md-4 shadow-sm">
        <a href="">
          <img
            class="img-responsive"
            src="https://s3.cloud.cmctelecom.vn/vfc.website.images/2009036/2009036_WHITE_1.jpg"
            width="100%"
          />
        </a>
      </div>
      <card-content>
        <div class="meida">
          <v-card-title>{{ product.productName }}</v-card-title>
          <v-card-text>
            <p>{{product.productDescription}}</p>
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
          </v-card-text>

          <div>
            <v-btn class="is-small">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </div>
        </div>
        <v-divider></v-divider>
      </card-content>
    </v-card>
  </div>
</template>


<script>
export default {
  name: "product",
  props: ["product"],

  data() {
    return {
      rating: 6,
      addToFavourite: "Add to favourite",
      removeToFavourite: "Remove from favourite",
    };
  },
};
</script>
<style>
.title {
  color: #000000;
}
</style>