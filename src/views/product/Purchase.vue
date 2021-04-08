<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-app id="inspire"> -->
      <!-- Navigation bar -->
      <my-header></my-header>
      <!-- V main -->
      <v-main class="purchase">
        <section class="top-discount-area d-md-flex align-items-center">
          <!-- Single Discount Area -->
          <div class="single-discount-area" id="area-a">
            <h5>Free Shipping &amp; Returns</h5>
            <h6><a href="/products">BUY NOW</a></h6>
          </div>
          <!-- Single Discount Area -->
          <div class="single-discount-area" id="area-b">
            <h5>20% Discount for all shirt</h5>
            <h6>CODE: 4menshirt</h6>
          </div>
          <!-- Single Discount Area -->
          <div class="single-discount-area" id="area-c">
            <h5>10% Discount for students</h5>
            <h6>CODE: Colorlib</h6>
          </div>
        </section>
        <br />
        <br />
        <div style="background-color: rgb(255, 247, 245)">
          <v-container fluid align="center" justify-center>
            <v-row>
              <v-col cols="12" sm="7" md="7" class="order-info">
                <h1>THÔNG TIN THANH TOÁN</h1>

                <v-form>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="firstname"
                          :counter="20"
                          :rules="rules.nameRules"
                          outlined
                          dense
                          label="Tên*"
                          background-color="#f4f2f8"
                          required
                          :error-messages="firstNameErrors"
                          @input="$v.firstname.$touch()"
                          @blur="$v.firstname.$touch()"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="lastname"
                          :counter="20"
                          :rules="rules.nameRules"
                          outlined
                          dense
                          label="Họ*"
                          required
                          :error-messages="lastNameErrors"
                          @input="$v.lastname.$touch()"
                          @blur="$v.lastname.$touch()"
                          background-color="#f4f2f8"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="email"
                          :counter="20"
                          :rules="rules.emailRules"
                          outlined
                          dense
                          label="Email"
                          :error-messages="emailErrors"
                          @input="$v.email.$touch()"
                          @blur="$v.email.$touch()"
                          required
                          background-color="#f4f2f8"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="phone"
                          :counter="20"
                          :rules="rules.phoneRules"
                          outlined
                          dense
                          :error-messages="phoneErrors"
                          @input="$v.phone.$touch()"
                          @blur="$v.phone.$touch()"
                          label="Số điện thoại*"
                          background-color="#f4f2f8"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          persistent-hint
                          :items="cityItem"
                          label="Chọn tỉnh/thành phố*"
                          v-model="city"
                          outlined
                          :error-messages="selectCityErrors"
                          @input="$v.city.$touch()"
                          @blur="$v.city.$touch()"
                          background-color="#f4f2f8"
                          dense
                          required
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="address"
                          :counter="20"
                          :rules="rules.addressRules"
                          outlined
                          dense
                          label="Địa chỉ*"
                          :error-messages="addressErrors"
                          @input="$v.address.$touch()"
                          @blur="$v.address.$touch()"
                          required
                          background-color="#f4f2f8"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>

                <v-spacer></v-spacer>
                <p>
                  Bạn đã có tài khoản chưa?
                  <a href="">Ấn vào đây để đăng nhập</a>
                </p>
              </v-col>
              <!-- <v-col cols="12" sm="1" md="1"></v-col> -->
              <v-col class="order-table" sm="5" md="5">
                <h1>YOUR ORDER</h1>
                <div class="order-item-detail mt-3">
                  <v-form>
                    <v-row class="order-item" dense>
                      <v-col>
                        <v-row>
                          <v-col><span>Product Name:</span></v-col>
                          <v-col
                            ><span>{{ product.productName }}</span></v-col
                          >
                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col cols="12">
                            <v-select
                              v-model="productDetailSize"
                              :items="product.productDetails"
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
                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col><span>Price:</span></v-col>
                          <v-col
                            ><span
                              ><u>đ</u>{{ formatPrice(product.productPrice) }}
                            </span></v-col
                          >
                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col cols="12">
                            <v-text-field
                              type="number"
                              :rules="[numberRule]"
                              v-model="quantity"
                              label="Số lượng"
                              append-outer-icon="mdi-information"
                              @change="quantity = $event"
                              :error-messages="quantityErrors"
                              @input="$v.quantity.$touch()"
                              @blur="$v.quantity.$touch()"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col><span>Discount:</span></v-col>
                          <v-col
                            ><span>{{ this.percentDiscount }}%</span></v-col
                          >
                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col><span>Mã Khuyến mãi:</span></v-col>
                          <v-col>
                            <v-dialog
                              v-model="dialog"
                              persistent
                              max-width="600px"
                              max-height="700px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <a
                                  color="primary"
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon>mdi-sale</v-icon>Chọn khuyến mãi
                                </a>
                              </template>
                              <v-card>
                                <v-card-title> Mã khuyến mãi </v-card-title>
                                <v-card-text>
                                  <div>
                                    <input
                                      id="voucher-code"
                                      type="text"
                                      placeholder="Nhap mã khuyến mãi"
                                    />
                                    <v-btn
                                      class="mx-3"
                                      color="primary"
                                      @click="checkPromotion()"
                                      >Áp dụng</v-btn
                                    >
                                  </div>
                                </v-card-text>
                                <v-card-actions>
                                  <v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false"
                                  >
                                    Close
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-col>
                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col><span>Total:</span></v-col>
                          <v-col
                            ><span
                              >{{
                                formatPrice(
                                  Math.round(
                                    this.quantity * product.productPrice -
                                      (this.quantity *
                                        product.productPrice *
                                        this.percentDiscount) /
                                        100
                                  )
                                )
                              }}đ</span
                            ></v-col
                          >
                          <v-col cols="12"><v-divider></v-divider></v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12"
                        ><v-btn
                          class="order-btn"
                          color="rgb(255, 66, 78)"
                          @click="createOrderByProduct()"
                          >Checkout</v-btn
                        >
                        <v-btn class="mx-4" color="primary">Payal</v-btn></v-col
                      >
                      <v-col cols="12"></v-col>
                    </v-row>
                  </v-form>
                  <v-spacer></v-spacer>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-main>
      <v-divider></v-divider>
      <!-- footer -->
      <my-footer></my-footer>
      <!-- </v-app> -->
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/Header.vue";
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.css";
import { validationMixin } from "vuelidate";
import { required, between, email } from "vuelidate/lib/validators";
import Vue from "vue";
Vue.use(VueIziToast);
const isPhone = (value) => /^\+?[0-9]+$/.test(value); //phone valid
export default {
  components: {
    "my-footer": VmFooter,
    "my-header": VmHeader,
  },
  mixins: [validationMixin],

  validations: {
    quantity: {
      between(value) {
        return between(1, this.totalQuantity)(value);
      },
    },
    productDetailSize: { required },
    productCart: { required },
    firstname: { required },
    lastname: { required },
    email: { required, email },
    phone: { isPhone },
    city: { required },
    district: { required },
    address: { required },
  },
  data: () => ({
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
        voucherId: "",
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

    dialog: false,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    percentDiscount: 0,
    inputCodePromotion: "",
    promotion: "",
    rules: {
      nameRules: [
        (v) => !!v || "First name is required",
        (v) => (v && v.length >= 2) || "First name  must have 5+ characters",
      ],
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) =>
          (v && v.length >= 10 && v.length < 12) ||
          "Phone number must have 10+ or smaller than 12 ",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      addressRules: [
        (v) => !!v || "Address is required",
        (v) => (v && v.length >= 5) || "Address  must have 5+ characters",
      ],
    },
    drawer: null,
    multiLine: true,
    snackbar: false,
    text: `I'm a multi-line snackbar.`,
    numberRule: (v) => {
      if (!isNaN(parseFloat(v)) && v > 0) return true;
      return "Number must be greater than 0!";
    },
    linkBar: [
      "Name",
      "Nữ",
      "Bộ sưu tập",
      "Blog",
      "khuyến mãi",
      "Hệ Thống cửa hàng",
    ],
    select: ["Giới tính"],
    itemGender: ["Nam", "Nữ"],
    cityItem: [
      "An Giang",
      "Bà Rịa–Vũng Tàu",
      "Bắc Giang",
      "Bắc Kạn",
      "Bạc Liêu",
      "Bắc Ninh",
      "Bến Tre",
      "Bình Định",
      "Bình Dương",
      "Bình Phước",
      "Bình Thuận",
      "Cà Mau",
      "Cần Thơ",
      "Cao Bằng",
      "Đà Nẵng",
      "Đắk Lắk",
      "Đắk Nông",
      "Điện Biên",
      "Đồng Nai",
      "Đồng Tháp",
      "Gia Lai",
      "Hà Giang",
      "Hà Nam",
      "Hà Nội",
      "Hà Tĩnh",
      "Hải Dương",
      "Hải Phòng",
      "Hậu Giang",
      "Hồ Chí Minh",
      "Hòa Bình",
      "Hưng Yên",
      "Khánh Hòa",
      "Kiên Giang",
      "Kon Tum",
      "Lai Châu",
      "Lâm Đồng",
      "Lạng Sơn",
      "Lào Cai",
      "Long An",
      "Nam Định",
      "Nghệ An",
      "Ninh Bình",
      "Ninh Thuận",
      "Phú Thọ",
      "Phú Yên",
      "Quảng Bình",
      "Quảng Nam",
      "Quảng Ngãi",
      "Quảng Ninh",
      "Quảng Trị",
      "Sóc Trăng",
      "Sơn La",
      "Tây Ninh",
      "Thái Bình",
      "Thái Nguyên",
      "Thanh Hóa",
      "Thừa Thiên–Huế",
      "Tiền Giang",
      "Trà Vinh",
      "Tuyên Quang",
      "Vĩnh Long",
      "Vĩnh Phúc",
      "Yên Bái",
    ],
    images: [],
    isValid: false,
    isAccount: false,
    mainImageSrc: null,
    productDetailSize: "",
    quantity: 0,
    alert: false,
  }),

  created() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },

  computed: {
    ...mapGetters("product", ["product"]),
    ...mapGetters("auth", ["user"]),
    ...mapGetters("order", ["status", "maxQuantity"]),
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
    selectErrors() {
      const errors = [];
      if (!this.$v.productDetailSize.$dirty) return errors;
      !this.$v.productDetailSize.required &&
        errors.push("Select product size is required");
      return errors;
    },
    selectCityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required && errors.push("Select city is required");
      return errors;
    },
    productCartErrors() {
      const errors = [];
      if (!this.$v.productCart.$dirty) return errors;
      !this.$v.productCart.required &&
        errors.push("Select product cart is required");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email is required.");
      !this.$v.email.email && errors.push("Email is invalid!");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.isPhone && errors.push("Phone must be valid!");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstname.$dirty) return errors;
      !this.$v.firstname.required && errors.push("First Name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastname.$dirty) return errors;
      !this.$v.lastname.required && errors.push("Last Name is required.");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("Address is required.");
      return errors;
    },
  },
  methods: {
    ...mapActions("product", ["productDetails"]),
    ...mapActions("order", ["createOrders"]),
    ...mapMutations("order", ["setMaxQuantity"]),
    ...mapActions("voucher", [
      "getVouchers",
      "getVoucherById",
      "createVoucher",
    ]),
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async checkPromotion() {
      try {
        const credential = {
          username: this.user.userName,
          voucherId: document.getElementById("voucher-code").value,
        };
        const result = await this.getVoucherById(credential);
        if (result.status === 200 && result.data.status == 1) {
          this.percentDiscount = result.data.promo;
          this.promotion = result.data;
          this.dialogVoucherValid();
        } else {
          this.percentDiscount = 0;
          this.promotion = "";
          this.dialogVoucherInvalid();
        }
      } catch (err) {
        this.percentDiscount = 0;
        this.promotion = "";
        this.dialogVoucherInvalid();
      }
    },
    async createOrderByProduct() {
      this.$v.$touch();
      if (
        this.quantityErrors.length === 0 &&
        this.selectErrors.length === 0 &&
        this.firstNameErrors.length === 0 &&
        this.lastNameErrors.length === 0 &&
        this.emailErrors.length === 0 &&
        this.phoneErrors.length === 0 &&
        this.addressErrors.length === 0 &&
        this.selectCityErrors.length === 0
      ) {
        this.$v.$reset();
        let promotionId = "";
        if (this.promotion === "") {
          promotionId = "";
        } else {
          promotionId = this.promotion.promotionID;
        }
        const credential = {
          productId: this.product.productId,
          productSize: this.productDetailSize.proSize,
          productQuantity: this.quantity,
          username: this.user.userName,
          name: `${this.firstname} ${this.lastname}`,
          phoneNumber: this.phone,
          email: this.email,
          country: this.city,
          address: this.address,
          promotionId: promotionId,
        };
        await this.createOrders(credential);
        if (this.status === 200) {
          this.dialogSuccess();
          this.$router.push("/products");
        } else if (this.status === 400) {
          this.dialogError();
        }
      }
    },
    dialogSuccess() {
      this.$toast.success(
        "Order product successfully!",
        "OK",
        this.notificationSystem.options.success
      );
    },
    dialogError() {
      this.$toast.error(
        "Something is wrong",
        "Error",
        this.notificationSystem.options.error
      );
    },
    dialogVoucherValid() {
      this.$toast.success(
        "Voucher is valid.",
        "OK",
        this.notificationSystem.options.success
      );
    },
    dialogVoucherInvalid() {
      this.$toast.error(
        "Voucher is invalid! Check again voucher code!",
        "Error",
        this.notificationSystem.options.error
      );
    },
    getQuantityBySize() {
      console.log(this.product);
      const index = this.product.productDetails.findIndex(
        (product) => product.proSize === this.productDetailSize.proSize
      );
      if (index != -1) {
        const quantity = this.product.productDetails[index].proQuantity;
        this.setMaxQuantity(quantity);
      }
    },
  },
  mounted() {
    this.productDetails(this.$route.params.idProduct);
    console.log(this.product);
  },
};
</script>

<style lang="scss">
.purchase {
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}

.app-bar {
  opacity: 15%;
}

.app-bar:hover {
  opacity: 100%;
}
.bar-center {
  background-color: #ffffff;
  opacity: 60%;
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

#footer-center .mx-auto {
  display: inline-table;
  align-items: center;
  padding: 5px;
}

#socialIcon {
  a {
    text-decoration: none;
    padding: 0px 15px 0px 15px;
  }
}

#voucher-code {
  box-sizing: border-box;
  height: 36px;
  padding-bottom: 4px;
  border-radius: 3px;
  border: 2px solid #c7c7c7;
  text-align: center;
  box-shadow: 0 0 10px 4px 0 0 10px 30px, 30px 0 20px 30px;
}

#promo-dialog {
  box-sizing: border-box;
  height: 36px;
  padding-bottom: 4px;
  border-radius: 3px;
  border: 2px solid #c7c7c7;
  text-align: center;
  box-shadow: 0 0 10px 4px 0 0 10px 30px, 30px 0 20px 30px;
}

.order-table {
  padding-right: 2em;
  margin-right: 0px;
}

.order-item-detail {
  background-color: #ffffff;
  border: solid #b3b3b3;
}

.order-info {
  padding-left: 10px;
}

.top-discount-area .single-discount-area {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 33.333333%;
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 40px 15px;
  background-color: #b8b8b8;
  text-align: center;
  -ms-flex-item-align: stretch;
  align-self: stretch;
}
.top-discount-area .single-discount-area:nth-child(2) {
  background-color: #ff084e;
}
.top-discount-area .single-discount-area:last-child {
  background-color: #3a3a3a;
}

.top-discount-area .single-discount-area h5 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 15px;
}
.top-discount-area .single-discount-area h6 {
  font-size: 10px;
  color: #fff;
  margin-bottom: 15px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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






