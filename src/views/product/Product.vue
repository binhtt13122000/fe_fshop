  <template>
  <div>
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
            <h1 style="font-family: 'Open Sans', sans-serif; margin-left: 11px">
              {{ product.productName }}
            </h1>
            <h3
              style="font-family: 'Open Sans', sans-serif; margin-left: 11px"
              class="price"
            >
              {{ product.productPrice }}<u>đ</u>
              <v-spacer></v-spacer>
            </h3>
          </div>
          <v-card-text>
            <v-row>
              <v-col>
                <v-rating
                  :value="5"
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
              <v-btn
                id="btn-addToCart"
                width="100%"
                :to="'/purchase/' + product.productId"
              >
                <v-icon>mdi-shopping</v-icon>
                Mua hàng ngay</v-btn
              >
            </v-col>
            <v-col>
              <v-btn width="100%" @click="addToCartDialog(product)">
                <v-icon>mdi-plus</v-icon>
                Giỏ hàng
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog v-model="dialogCart" max-width="500px">
      <v-card>
        <v-card-title class="headline blue darken-1"
          >Add product to cart:</v-card-title
        >
        <v-card-actions>
          <v-form>
            <v-col>
              <v-text-field
                readonly
                :value="productSelected.productName"
                label="Product Name:"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="productDetailSize"
                :items="this.productSelected.productDetails"
                label="Chọn kích thước:"
              >
                <template v-slot:item="{ item }">
                  {{ item.proSize }}
                </template>
                <template v-slot:selection="{ item }">
                  {{ item.proSize }}
                </template>
              </v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="productCart"
                :items="carts"
                item-text="cartId"
                label="Chọn cart:"
              >
                <template v-slot:item="{ item }">
                  {{ item.cartDescription }}
                </template>
                <template v-slot:selection="{ item }">
                  {{ item.cartDescription }}
                </template>
              </v-select>
            </v-col>
            <v-col>
              <v-text-field
                type="number"
                :rules="[numberRule]"
                v-model="quantity"
                label="Số lượng"
                append-outer-icon="mdi-information"
                @change="quantity = $event"
              ></v-text-field>
            </v-col>
          </v-form>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeCartDialog()"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="addToCartDialogConfirm()"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
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
      productSelected: {},
      dialogCart: false,
      productDetailSize: "",
      productCart: {},
      quantity: 0,
      numberRule: (v) => {
        if (!isNaN(parseFloat(v)) && v > 0) return true;
        return "Number must be greater than 0!";
      },
    };
  },

  methods: {
    ...mapActions("auth", ["addProductInCartDetail"]),
    changeFavourite() {
      if (this.isFavourite == true) {
        this.isFavourite = false;
      } else if (this.isFavourite == false) {
        this.isFavourite = true;
      }
    },
    addToCartDialog(product) {
      this.dialogCart = true;
      console.log(product);
      this.productSelected = product;
    },

    addToCartDialogConfirm() {
      const credential = {
        cartId: this.productCart,
        username: this.user.userName,
        productId: this.productSelected.productId,
        cartSize: this.productDetailSize.proSize,
        cartQuantity: this.quantity,
      };
      console.log(credential);
      this.addProductInCartDetail(credential);
    },

    closeCartDialog() {
      this.dialogCart = false;
      this.productSelected = "";
    },
  },
  computed: {
    ...mapGetters("auth", ["cart", "carts", "user"]),
  },
  mounted() {
    // this.$store.state.auth.cart
  },
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