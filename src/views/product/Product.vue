  <template>
  <div>
    <v-card class="mx-4 mb-4">
      <div class="md-4 shadow-sm" id="button-container">
        <div
          class="displayImg"
          v-for="(productImage, i) in product.productImages"
          :key="i"
        >
          <a :href="'/products/' + product.productId">
            <img
              v-if="i == 0"
              class="img-responsive"
              :src="productImage.imgUrl"
              width="100%"
            />
          </a>
        </div>
        <v-btn
          class="is-small-a"
          align="left"
          justify="right"
          :title="removeToFavourite"
          v-show="isFavourite"
          @click="changeFavourite()"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn
          class="is-small-b"
          align="left"
          justify="right"
          :title="addToFavourite"
          v-show="!isFavourite"
          @click="changeFavourite()"
        >
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
      </div>
      <div class="media">
        <div class="media-info">
          <h1 style="font-family: 'Open Sans', sans-serif;">{{ product.productName }}</h1>
          <h3 style="font-family: 'Open Sans', sans-serif;" class="price">
            {{ product.productPrice }}<u>đ</u>
            <v-spacer></v-spacer>
          </h3>
        </div>
        <v-card-text>
          
          <v-row>
            <v-col>
              
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="24"
              ></v-rating>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <v-spacer></v-spacer>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn id="btn-addToCart" width="100%">
              <v-icon>mdi-shopping</v-icon>
              Đăng ký mua</v-btn
            >
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
import { mapActions } from 'vuex';
export default {
  name: "product",
  props: ["product"],

  data() {
    return {
      active: true,
      isFavourite: false,
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
  ...mapActions("cart")
};
</script>
<style lang="scss">
.title {
  color: #000000;
}


#button-container {
  position: relative;
  display: inline-block;
}

#button-container .img {
  /* display: block; */
  position: relative;
}

#button-container .is-small-a {
  position: absolute;
  bottom: 2em;
  right: 2em;
  /* background-color:#8F0005; */
  border-radius: 1.5em;
  color: #ff0000;
  border-color: #ff0000;
  text-transform: uppercase;
  padding: 1em 1.5em;
}
#button-container .is-small-b {
  position: absolute;
  bottom: 2em;
  right: 2em;
  /* background-color:#8F0005; */
  border-radius: 1.5em;
  color: #000000;
  border-color: #000000;
  text-transform: uppercase;
  padding: 1em 1.5em;
}

.media-info {
  text-align: left;
}

.media-info .price {
  color: #ff0000;
}

#btn-addToCart {
  background-color: #ff0000;
  color: #ffffff;

  &#btn-addToCart:hover {
    background-color: #000000;
  }
}


</style>