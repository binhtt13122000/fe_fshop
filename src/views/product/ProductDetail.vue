<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-app id="inspire"> -->
      <VmHeader></VmHeader>
      <!-- v-breadcrumbs -->

      <!-- V main -->
      <v-main>
        <div class="breadCrumbs">
          <v-breadcrumbs :items="itemBreadCrumbs" large></v-breadcrumbs>
        </div>
        <div class="section">
          <div class="att_pro">
            <v-container>
              <v-row class="d-flex justify-content-center">
                <v-col cols="12" md="8" xs="12" sm="12">
                  <!-- Create carouel -->
                  <!-- <div class="md-4 shadow-sm" > -->
                  <v-carousel
                    class="section-carousel"
                    style="width: 100%; height: auto"
                  >
                    <v-carousel-item
                      v-for="(productImage, i) in product.productImages"
                      :key="i"
                      :src="productImage.imgUrl"
                      alt="productImage.imgUrl"
                      cycle
                      hide-delimiter-background
                      show-arrows-on-hover
                    >
                    </v-carousel-item>
                  </v-carousel>
                  <v-card
                    v-for="(productImage, i) in product.productImages"
                    :key="i"
                    class="img-carouel"
                  >
                    <img
                      id="img-responsive"
                      class="mx-auto"
                      width="25%"
                      :src="productImage.imgUrl"
                    />
                  </v-card>

                  <br />
                  <!-- </div> -->
                  <v-tabs class="evaluate" background-color="indigo" dark>
                    <v-tab>Đánh giá</v-tab>
                    <v-tab-item>
                      <v-container fluid>
                        <v-row>
                          <v-container fluid>
                            <v-row>
                              <img
                                src="https://i.pinimg.com/originals/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                                alt="avatar"
                                width="3%"
                                height="3%"
                              />

                              <v-col>
                                <v-form>
                                  <v-text-field hint="Add your comment">
                                  </v-text-field>
                                </v-form>
                              </v-col>
                              <h2
                                class="grey--text text--lighten-2 caption mr-2"
                              >
                                ({{ rating }})
                              </h2>
                              <v-rating
                                v-model="rating"
                                background-color="black"
                                color="yellow accent-4"
                                dense
                                half-increments
                                hover
                                size="20"
                              ></v-rating>
                            </v-row>
                          </v-container>
                        </v-row>
                      </v-container>
                    </v-tab-item>
                  </v-tabs>
                </v-col>
                <v-col cols="10" md="4" align="left">
                  <div class="sumary-inner"></div>
                  <div
                    class="size-inner"
                    style="font-family: 'Open Sans', sans-serif"
                  >
                    <h1>{{ product.productName }}</h1>
                    <!-- <p>{{ product.productDescription }}</p> -->
                    <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="16"
                      ><v-spacer></v-spacer
                    ></v-rating>

                    <h4 class="price">
                      <br />
                      <span>Giá bán:</span>
                      {{ formatPrice(product.productPrice) }}<u>đ</u>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                    </h4>
                    <v-divider></v-divider>
                    <br />
                    <v-form>
                      <v-row>
                        <v-col>
                          <div class="swatch-picker">
                            <p style="font-family: 'Open Sans', sans-serif">
                              Size:
                            </p>
                            <div>
                              <label
                                v-for="(product, i) in product.productDetails"
                                :key="i"
                                v-show="product.proQuantity != 0"
                              >
                                <input
                                  type="radio"
                                  name="sel_size"
                                  :error-messages="quantityErrors"
                                  @input="$v.quantity.$touch()"
                                  @blur="$v.quantity.$touch()"
                                  :value="product.proSize"
                                  v-model="productSize"
                                />
                                <span class="radio-size">{{
                                  product.proSize
                                }}</span>
                              </label>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="btn-quantity">
                          <span style="font-family: 'Open Sans', sans-serif"
                            >Quantity:
                          </span>
                          <v-btn class="btn-minus" v-on:click="decreaseValue()"
                            ><v-icon>mdi-minus</v-icon></v-btn
                          >
                          <input
                            v-model="quantity"
                            type="number"
                            id="number"
                            :min="1"
                            :max="100"
                            :error-messages="quantityErrors"
                            @input="$v.quantity.$touch()"
                            @blur="$v.quantity.$touch()"
                          />
                          <v-btn class="btn-plus" v-on:click="increaseValue()"
                            ><v-icon>mdi-plus</v-icon></v-btn
                          >
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-btn
                            width="100%"
                            :to="'/purchase/' + product.productId"
                          >
                            <v-icon>mdi-shopping</v-icon>
                            Mua hàng ngay
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            id="btn-addToCart"
                            width="100%"
                            v-on:click="addToCartDialog(product)"
                          >
                            <v-icon>mdi-plus</v-icon>
                            Thêm vào giỏ hàng
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-spacer></v-spacer>
                    </v-form>
                  </div>
                  <v-spacer></v-spacer>
                  <br />
                  <br />
                  <div class="product-detail-inner">
                    <div
                      class="shipping-rules"
                      style="background-color: grey lighten-3"
                    >
                      <ul>
                        <li>
                          <img
                            class="img-responsive"
                            src="https://ninomaxx.com.vn/wp-content/themes/basel-child/icon/truck.png"
                            width="4%"
                          />
                          <b> Miễn phí vận chuyển</b>
                          <p>
                            Khu vực TP HCM: từ 300.000đ
                            <br />
                            Các khu vực khác: từ 500.000đ
                            <br />
                            Mua thêm sản phẩm để được freeship nhé khách ơi!
                          </p>
                        </li>
                      </ul>
                    </div>
                    <!-- accordion-->
                    <div class="accordion">
                      <v-expansion-panels focusable>
                        <v-expansion-panel>
                          <v-expansion-panel-header
                            >HƯỚNG DẪN SỬ DỤNG</v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                            <p>
                              Giặt máy ở nhiệt độ thường. Không sử dụng chất
                              tẩy. Phơi trong bóng mát. Sấy khô ở nhiệt độ thấp.
                              Là ở nhiệt độ thấp 110 độ C. Giặt với sản phẩm
                              cùng màu. Không là lên chi tiết trang trí.
                            </p>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                      <v-expansion-panels focusable>
                        <v-expansion-panel>
                          <v-expansion-panel-header
                            >CHÍNH SÁCH ĐỔI HÀNG</v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                            Quy định đổi hàng: 4MenShop hỗ trợ Quý khách đổi
                            hàng 1 lần trong vòng 15 ngày theo biên lai giao
                            nhận. Không áp dụng với sản phẩm đã qua sử dụng,
                            hàng khuyến mãi, bị hư hại do tác nhân bên ngoài
                            hoặc đã quá thời gian đổi hàng theo quy định. Sản
                            phẩm cần đổi phải chưa qua sử dụng, còn nguyên tag
                            giá. Có hóa đơn mua hàng (kèm theo sản phẩm). Có hóa
                            đơn giao nhận. Sản phẩm mới phải có giá bằng hoặc
                            cao hơn sản phẩm đổi.
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                      <v-expansion-panels focusable>
                        <v-expansion-panel>
                          <v-expansion-panel-header
                            >HƯỚNG DẪN ĐẶT HÀNG</v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                            Vui lòng chọn sản phẩm mà bạn thích. Sau đó vào giỏ
                            hảng, chọn thanh toán.
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                    <div class="product-share">
                      <v-container>
                        <v-row
                          id="socialIcon"
                          class="d-flex align-items-center"
                        >
                          <v-col md="12" lg="12" xl="12" class="mx-auto mt-3">
                            <div class="social-items">
                              <span>Share:</span>
                              <a href=""
                                ><v-icon size="23">mdi-google</v-icon></a
                              >
                              <a href=""
                                ><v-icon size="23">mdi-facebook</v-icon></a
                              >
                              <a href=""
                                ><v-icon size="23">mdi-instagram</v-icon></a
                              >
                              <a href=""
                                ><v-icon size="23">mdi-twitter</v-icon></a
                              >
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <v-divider></v-divider>
          <div>
            <v-container>
              <h1>SẢN PHẨM TƯƠNG TỰ</h1>
              <v-carousel style="width: 100%; height: 350px">
                <a :href="'/products/' + product.productId">
                  <v-carousel-item
                    v-for="(productImage, i) in product.productImages"
                    :key="i"
                    :src="productImage.imgUrl"
                    alt="productImage.imgUrl"
                    cycle
                    hide-delimiter-background
                    show-arrows-on-hover
                  >
                  </v-carousel-item>
                </a>
              </v-carousel>
            </v-container>
          </div>
          <!-- Comment container -->
          <div>
            <v-container>
              <v-tabs class="comment" background-color="indigo" dark>
                <v-tab>Bình luận</v-tab>
                <v-tab-item>
                  <v-container fluid>
                    <v-row>
                      <v-card align="center" elevation="2">
                        <v-form v-for="cmt in comments" :key="cmt.commentId">
                          <v-row>
                            <v-col md="2">
                              <img
                                src="https://i.pinimg.com/originals/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                                alt="avatar"
                                width="60%"
                                height="40%"
                                class="mx-3"
                              />
                              <p class="text-secondary text-center">
                                15 Minutes Ago
                              </p>
                            </v-col>
                            <v-col md="10">
                              <v-text-field
                                filled
                                :value="cmt.content"
                                :label="cmt.name"
                                readonly
                              ></v-text-field>

                              <div style="text-align: right">
                                <v-btn
                                  class="mx-1"
                                  color="success"
                                  @click="createCmm()"
                                  >Send</v-btn
                                >
                                <v-btn class="mx-1"
                                  ><v-icon>mdi-reply</v-icon>Reply</v-btn
                                >
                                <v-btn class="mx-1" color="red"
                                  ><v-icon>mdi-delete</v-icon>Delete</v-btn
                                >
                              </div>
                            </v-col>

                            <v-row v-if="cmt.parentId != null">
                              <v-col md="2">
                                <img
                                  src="https://i.pinimg.com/originals/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                                  alt="avatar"
                                  width="60%"
                                  height="40%"
                                  class="mx-3"
                                />
                                <p class="text-secondary text-center">
                                  15 Minutes Ago
                                </p>
                              </v-col>
                              <v-col md="10">
                                <v-text-field
                                  filled
                                  :value="cmt.content"
                                  :label="cmt.name"
                                  readonly
                                ></v-text-field>

                                <div style="text-align: right">
                                  <v-btn
                                    class="mx-1"
                                    color="success"
                                    @click="createCmm()"
                                    >Send</v-btn
                                  >
                                  <v-btn class="mx-1"
                                    ><v-icon>mdi-reply</v-icon>Reply</v-btn
                                  >
                                  <v-btn class="mx-1" color="red"
                                    ><v-icon>mdi-delete</v-icon>Delete</v-btn
                                  >
                                </div>
                              </v-col>
                            </v-row>
                          </v-row>
                        </v-form>
                      </v-card>
                      <v-row>
                        <img
                          src="https://i.pinimg.com/originals/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                          alt="avatar"
                          width="10%"
                          height="%"
                        />
                        <v-textarea
                          v-model="addComment"
                          label="Comment"
                          auto-grow
                          outlined
                          rows="5"
                          row-height="10"
                        ></v-textarea>
                        <v-btn color="success" @click="createCmm()">Send</v-btn>
                      </v-row>
                    </v-row>
                  </v-container>
                </v-tab-item>
              </v-tabs>
            </v-container>
          </div>

          <v-dialog v-model="dialogCart" max-width="500px">
            <v-card>
              <v-card-title class="headline blue darken-1"
                >Select the cart:</v-card-title
              >
              <v-card-actions>
                <v-form>
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
                </v-form>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeCartDialog()"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="addToCartDialogConfirm()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-main>

      <!-- V-footer  ------->
      <v-divider></v-divider>
      <VmFooter></VmFooter>
      <!-- </v-app> -->
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/Header.vue";
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.css";
import Vue from "vue";
Vue.use(VueIziToast);
export default {
  props: {
    source: String,
  },
  mixins: [validationMixin],

  validations: {
    quantity: {
      between(value) {
        return between(1, this.totalQuantity)(value);
      },
    },
    productCart: { required },
    productSize: { required },
  },
  components: { VmFooter, VmHeader },
  data: () => ({
    modelSize: "Size",
    badgeCart: 1,
    modelQuantity: "Quantity",
    modelComment: ["Mới nhất"],
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
    quantity: 0,
    productSize: "",
    addComment: "",
    size: 1,
    rating: 5,
    tab: null,
    itemComments: ["Mới nhất", "Cũ"],
    itemTabs: ["Đánh giá", "Bình luận"],
    productSelected: {},
    dialogCart: false,
    productDetailSize: "",
    productCart: {},

    numberRule: (v) => {
      if (!isNaN(parseFloat(v)) && v > 0) return true;
      return "Number must be greater than 0!";
    },
    itemBreadCrumbs: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Nam",
        disabled: false,
        href: "/products",
      },
      {
        text: "Ao",
        disabled: true,
      },
    ],
    linkBar: [
      "Name",
      "Nữ",
      "Bộ sưu tập",
      "Blog",
      "khuyến mãi",
      "Hệ Thống cửa hàng",
    ],
    isValid: false,
    isAccount: false,
  }),
  computed: {
    ...mapGetters("auth", ["cart", "carts", "user"]),
    ...mapGetters("product", ["product"]),
    ...mapGetters("order", ["status", "maxQuantity"]),
    ...mapGetters("comment", ["comment", "comments"]),
    totalQuantity() {
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
    productCartErrors() {
      const errors = [];
      if (!this.$v.productCart.$dirty) return errors;
      !this.$v.productCart.required &&
        errors.push("Select product cart is required");
      return errors;
    },
    productSizeError() {
      const errors = [];
      if (!this.$v.productSize.$dirty) return errors;
      !this.$v.productSize.required &&
        errors.push("Select product size is required");
      return errors;
    },
  },
  methods: {
    ...mapActions("auth", ["addProductInCartDetail"]),
    ...mapActions("product", ["productDetails"]),
    increaseValue() {
      return this.quantity++;
    },
    formatPrice(value) {
      let price = value.toString().replace(".", ",");
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    decreaseValue() {
      if (this.quantity <= 1) {
        return (this.quantity = 1);
      } else {
        return this.quantity--;
      }
    },
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    changeFavourite() {
      if (this.isFavourite == true) {
        this.isFavourite = false;
      } else if (this.isFavourite == false) {
        this.isFavourite = true;
      }
    },
    addToCart() {
      return this.badgeCart++;
    },
    createCmm() {
      // this.$v.$touch();
      var date = new Date("2021-03-25 12:00:00.Z");
      var creadential = {
        productId: this.productSelected.productId,
        userName: this.user.userName,
        newComment: {
          name: this.user.name,
          phoneNumber: this.user.phoneNumber,
          content: this.addComment,
          createTime: date,
          parenId: 1,
          status: 1,
          productId: this.productSelected.productId,
          userId: this.user.userId,
          proId: this.productSelected.productId,
        },
      };
      // console.log(this.user.userName);
      // console.log(creadential);
      this.createComment(creadential);
      // this.getCommentById(this.productSelected.productId);
      this.addComment = "";
    },
    addToCartDialog(product) {
      this.$v.$touch();
      if (
        this.quantityErrors.length === 0 &&
        this.productSizeError.length === 0
      ) {
        this.$v.$reset();
        this.dialogCart = true;
        this.productSelected = product;
      }
    },
    async addToCartDialogConfirm() {
      this.$v.$touch();
      if (
        this.quantityErrors.length === 0 &&
        this.$v.productCart.required &&
        this.productSizeError.length === 0
      ) {
        this.$v.$reset();
        const credential = {
          cartId: this.productCart,
          username: this.user.userName,
          productId: this.productSelected.productId,
          cartSize: this.productSize,
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
        "Add product in cart is failed!",
        "Error",
        this.notificationSystem.options.error
      );
    },
    ...mapActions("auth", ["addProductInCartDetail"]),
    ...mapActions("product", ["productDetails"]),
    ...mapActions("comment", ["getCommentById", "createComment"]),
  },
  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  mounted() {
    this.productDetails(this.$route.params.idProduct);
    this.productSelected = this.product;
    // console.log(this.productSelected);
    if (this.$route.params.idProduct == null) {
      this.getCommentById(this.$route.params.idProduct);
    } else {
      console.log("Danh che con me may");
    }
  },
};
</script>

<style lang="scss">
.bar-center {
  background-color: #ffffff;
}

.app-bar {
  opacity: 100%;
}

.nar-bar-btn {
  .nar-links {
    list-style-type: none;
  }

  .nar-links li {
    display: inline;
    padding: 0px 12px 0px 12px;
  }
  .nar-links li a {
    color: #ffffff;
    text-decoration: none;
    font-size: 15px;
    text-transform: uppercase;
  }
  // main image

  // footer
}

#footer-center {
  h4 {
    font-family: "Times New Roman", Times, serif;
    font-size: 25px;
    text-align: center;
  }
  ul {
    list-style-type: none;
    li a {
      text-decoration: none;
      text-align: left;
      justify-content: left;
      color: #000000;
    }
    li a:hover {
      text-decoration: underline;
      color: #ff0000;
    }
  }
}

#socialIcon {
  a {
    text-decoration: none;
    padding: 0px 15px 0px 15px;
  }
}

.shipping-rules {
  background-color: #f2f2f2;
  ul {
    list-style: none;
  }
}

#btn-addToCart {
  background-color: #ff0000;
  color: #ffffff;

  &#btn-addToCart:hover {
    background-color: #000000;
  }
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  text-align: center;
  font-family: sans-serif;
}

// Size-inner
.size-inner {
  .price {
    color: #ff0000;
  }

  .price span {
    color: #000000;
  }
}

.swatch-picker {
  p {
    display: inline-block;
    text-align: left;
    padding-right: 20px;
  }
  label {
    display: inline-block;
    height: 40px;
    width: 40px;
    position: relative;
    margin: 0 2px;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .radio-size {
    padding-top: 7px;
    background-color: #000000;
  }

  span {
    display: block;
    color: #ffffff;
    text-align: center;
    justify-content: center;
    //  text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    border-radius: 50%;
    bottom: 10px;
    left: 10;
    height: 100%;
    width: 100%;
  }

  input {
    -webkit-appearance: none;
  }

  input:checked + span {
    padding-top: 3px;
    border: 3px solid rgb(177, 177, 177);
    background-color: rgb(177, 177, 177);
    border: 3px solid rgb(177, 177, 177);
  }
}

.comment {
  border: 1px solid rgba(192, 192, 192, 0.849);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#footer-center .mx-auto {
  display: inline-table;
  align-items: center;
  padding: 5px;
}
#number {
  box-sizing: border-box;
  height: 36px;
  padding-bottom: 4px;
  border-radius: 3px;
  border: 2px solid #c7c7c7;
  text-align: center;
  box-shadow: 0 0 10px 4px 0 0 10px 30px, 30px 0 20px 30px;
}

.btn-quantity .btn-minus {
  -moz-box-shadow: 0px 0px #666;
  -webkit-box-shadow: 0px 0px #666;
  box-shadow: 0px 0px #666;
  border: 1px solid #c7c7c7;
  // border-radius: 10px;
}

.btn-quantity .btn-plus {
  -moz-box-shadow: 0px 0px #666;
  -webkit-box-shadow: 0px 0px #666;
  box-shadow: 0px 0px #666;
  border: 1px solid #c7c7c7;
  // border-radius: 10px;
}

.img-carouel {
  display: inline;
}

@media only screen and (max-width: 1390px) {
}
@media only screen and (max-width: 600px) {
  .image-center-item {
    display: block;
  }
  #footer-center .mx-auto {
    display: block;
    text-align: center;
  }
}
</style>