<template>
  <div>
    <v-card>
      <div
        class="md-4 shadow-sm"
        v-for="(productImage, i) in product.productImages"
        :key="i"
      >
        <a :href="'/productdetail/' + product.productId">
          <img class="img-responsive" :src="productImage.imgUrl" width="100%" />
        </a>
      </div>
      <div class="media">
        <v-card-title>{{ product.productName }}</v-card-title>
        <v-card-text>
          <p>{{ product.productDescription }}</p>
          <v-row>
            <v-col>
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          </v-col>
          <v-btn
            class="is-small"
            align="left"
            justify="right"
            :title="removeToFavourite"
            v-show="isFavourite"
            @click="changeFavourite()"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn
            class="is-small"
            align="left"
            justify="right"
            :title="addToFavourite"
            v-show="!isFavourite"
            @click="changeFavourite()"
          >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          </v-row>
        </v-card-text>
      </div>

      <v-spacer></v-spacer>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn width="100%">
              <v-icon>mdi-shopping</v-icon>
              Add to card</v-btn>
          </v-col>
          <v-col>
            <v-btn width="100%">
              <v-icon>mdi-plus</v-icon>
              Giỏ hàng
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
export default {
  name: "product",
  props: ["product"],

  data() {
    return {
      isFavourite: true,
      rating: 6,
      addToFavourite: "Add to favourite",
      removeToFavourite: "Remove from favourite",
    };
  },

  methods: {
    changeFavourite() {
      if (this.isFavourite == true) {
        this.isFavourite = false;
      } else if (this.isFavourite == false) {
        this.isFavourite = true;
      }
    },
  },
};
</script>
<style>
.title {
  color: #000000;
}
</style>