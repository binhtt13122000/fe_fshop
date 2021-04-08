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
              {{ formatPrice(product.productPrice) }}<u>đ</u>
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
                single-line
                :error-messages="selectErrors"
                @click="$v.productDetailSize.$touch()"
                @blur="$v.productDetailSize.$touch()"
                @input="getQuantityBySize()"
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
                :error-messages="productCartErrors"
                @click="$v.productCart.$touch()"
                @blur="$v.productCart.$touch()"
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
                :error-messages="quantityErrors"
                append-outer-icon="mdi-information"
                @change="quantity = $event"
                @input="$v.quantity.$touch()"
                @blur="$v.quantity.$touch()"
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
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.css";
import Vue from "vue";
Vue.use(VueIziToast);
export default {
  name: "product",
  props: ["product"],
  mixins: [validationMixin],

  validations: {
    quantity: {
      between(value) {
        return between(1, this.totalQuantity)(value);
      },
    },
    productDetailSize: { required },
    productCart: { required },
  },
  data() {
    return {
      active: true,
      isFavourite: false,
      drawer: null,
      notificationSystem: {
        options: {
          show: {
            theme: "dark",
            icon: "icon-person",
            position: "topCenter",
            progressBarColor: "rgb(0, 255, 184)",
            onOpening: function () {
              console.info("callback abriu!");
            },
            onClosing: function (closedBy) {
              console.info("closedBy: " + closedBy);
            },
          },
          success: {
            position: "topRight",
          },
          warning: {
            position: "topRight",
          },
          error: {
            position: "topRight",
          },
          question: {
            close: false,
            overlay: true,
            toastOnce: true,
            id: "question",
            zindex: 999,
            position: "center",
            buttons: [
              [
                "<button><b>YES</b></button>",
                function (instance, toast) {
                  instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                },
                true,
              ],
              [
                "<button>NO</button>",
                function (instance, toast) {
                  instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                },
              ],
            ],
            onClosing: function (instance, toast, closedBy) {
              console.info("Closing | closedBy: " + closedBy);
            },
            onClosed: function (instance, toast, closedBy) {
              console.info("Closed | closedBy: " + closedBy);
            },
          },
        },
      },
      multiLine: true,
      snackbar: false,
      text: `I'm a multi-line snackbar.`,
      rating: 6,
      addToFavourite: "Add to favourite",
      removeToFavourite: "Remove from favourite",
      max: 0,
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
    ...mapActions("order", ["setMaxQuantity"]),
    changeFavourite() {
      if (this.isFavourite == true) {
        this.isFavourite = false;
      } else if (this.isFavourite == false) {
        this.isFavourite = true;
      }
    },
    addToCartDialog(product) {
      this.dialogCart = true;
      this.productSelected = product;
    },

    async addToCartDialogConfirm() {
      this.$v.$touch();
      if (
        this.quantityErrors.length === 0 &&
        this.$v.productCart.required &&
        this.selectErrors.length === 0
      ) {
        this.$v.$reset();
        const credential = {
          cartId: this.productCart,
          username: this.user.userName,
          productId: this.productSelected.productId,
          cartSize: this.productDetailSize.proSize.trim(),
          cartQuantity: this.quantity,
        };
        try {
          const response = await this.addProductInCartDetail(credential);
          if (response !== "" && response.status === 200) {
            this.dialogSuccess();
            this.closeCartDialog();
          } else {
            this.dialogError();
          }
        } catch (err) {
          this.dialogError();
        }
      }
    },

    closeCartDialog() {
      this.dialogCart = false;
      this.productSelected = "";
    },
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getQuantityBySize() {
      const index = this.productSelected.productDetails.findIndex(
        (product) => product.proSize === this.productDetailSize.proSize
      );
      if (index != -1) {
        const quantity = this.productSelected.productDetails[index].proQuantity;
        this.setMaxQuantity(quantity);
      }
      console.log(this.$v.quantity.$params);
    },
    dialogSuccess() {
      this.$toast.success(
        "Add product in cart successfully!",
        "OK",
        this.notificationSystem.options.success
      );
    },
    dialogError() {
      this.$toast.error(
        "Add product in cart is failed",
        "Error",
        this.notificationSystem.options.error
      );
    },
  },
  computed: {
    ...mapGetters("auth", ["cart", "carts", "user"]),
    ...mapGetters("order", ["status", "maxQuantity"]),
    totalQuantity() {
      console.log(423);
      return this.maxQuantity;
    },
    quantityErrors() {
      const errors = [];
      if (!this.$v.quantity.$dirty) return errors;
      !this.$v.quantity.between &&
        errors.push(
          `Quantity must be between ${this.$v.quantity.$params.between.min} and ${this.$v.quantity.$params.between.max}`
        );
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.productDetailSize.$dirty) return errors;
      !this.$v.productDetailSize.required &&
        errors.push("Select product size is required");
      return errors;
    },
    productCartErrors() {
      const errors = [];
      if (!this.$v.productCart.$dirty) return errors;
      !this.$v.productCart.required &&
        errors.push("Select product cart is required");
      return errors;
    },
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